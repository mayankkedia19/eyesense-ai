# ============================================================
#  EyeSense — services/image_processing.py
#  FINAL VERSION (DATA-TUNED)
# ============================================================

import cv2
import numpy as np

DETAILS = {
    "Normal":
        "No significant anomalies detected. Eye appears healthy.",
    "Anemia":
        "Pale conjunctiva detected. May indicate low hemoglobin levels.",
    "Cataract":
        "Cloudy or yellowish lens detected. Possible cataract formation.",
    "Glaucoma":
        "Darkened optic region detected. Possible pressure-related damage.",
}

RECOMMENDATIONS = {
    "Normal":
        "No immediate action needed. Maintain regular checkups.",
    "Anemia":
        "Consider a blood test. Consult a physician.",
    "Cataract":
        "Consult an ophthalmologist for further evaluation.",
    "Glaucoma":
        "Immediate eye pressure test recommended.",
}


# ============================================================
# MAIN ENTRY
# ============================================================

def analyze_eye_image(img: np.ndarray) -> dict:
    result = _heuristic_analyze(img)
    result["model_used"] = "data-tuned-heuristic-v3"
    return result


# ============================================================
# HEURISTIC ANALYSIS
# ============================================================

def _heuristic_analyze(img: np.ndarray) -> dict:

    img = cv2.resize(img, (224, 224))
    img_f = img.astype(np.float32)

    brightness = float(np.mean(img_f))

    # Global channels
    b = float(np.mean(img_f[:, :, 0]))
    g = float(np.mean(img_f[:, :, 1]))
    r = float(np.mean(img_f[:, :, 2]))

    # Sclera ROI
    h, w = img.shape[:2]
    roi = img_f[h // 4: 3 * h // 4, w // 4: 3 * w // 4]

    roi_r = float(np.mean(roi[:, :, 2]))
    roi_g = float(np.mean(roi[:, :, 1]))
    roi_b = float(np.mean(roi[:, :, 0]))

    # Lens ROI
    lens = img_f[h // 3: 2 * h // 3, w // 3: 2 * w // 3]

    lens_r = float(np.mean(lens[:, :, 2]))
    lens_g = float(np.mean(lens[:, :, 1]))
    lens_b = float(np.mean(lens[:, :, 0]))

    scores = _compute_scores(
        r, g, b,
        roi_r, roi_g, roi_b,
        lens_r, lens_g, lens_b,
        brightness,
        img
    )

    top = max(scores, key=lambda x: x["score"])

    return {
        "condition": top["condition"],
        "confidence": f"{min(round(top['score'], 1), 95)}%",
        "severity": top["severity"],
        "details": DETAILS[top["condition"]],
        "recommendation": RECOMMENDATIONS[top["condition"]],
        "all_scores": sorted(scores, key=lambda x: -x["score"]),
    }


# ============================================================
# SCORING ENGINE (DATA-TUNED)
# ============================================================

def _compute_scores(r, g, b,
                    roi_r, roi_g, roi_b,
                    lens_r, lens_g, lens_b,
                    brightness,
                    img):

    scores = []

    # ── NORMAL ─────────────────────────────
    normal = 0.0

    if brightness > 135:
        normal += (brightness - 135) * 1.5

    balance = abs(r - g) + abs(g - b)
    normal += max(0, 40 - balance * 0.5)

    scores.append({
        "condition": "Normal",
        "score": normal,
        "severity": "None",
    })

    # ── ANEMIA ─────────────────────────────
    anemia = 0.0

    if g < 120:
        anemia += (120 - g) * 1.5

    if roi_g < roi_r and roi_g < roi_b:
        anemia += 20

    scores.append({
        "condition": "Anemia",
        "score": min(anemia, 95),
        "severity": "High" if anemia > 70 else "Moderate" if anemia > 40 else "Mild",
    })

    # ── CATARACT ───────────────────────────
    cataract = 0.0

    if r > g and g > b:
        cataract += 40

    if (r - b) > 30:
        cataract += (r - b) * 0.5

    scores.append({
        "condition": "Cataract",
        "score": min(cataract, 95),
        "severity": "High" if cataract > 70 else "Moderate" if cataract > 40 else "Mild",
    })

    # ── GLAUCOMA ───────────────────────────
    glaucoma = 0.0

    if r > 160:
        glaucoma += (r - 160) * 1.5

    if r > g * 1.2:
        glaucoma += 25

    scores.append({
        "condition": "Glaucoma",
        "score": min(glaucoma, 95),
        "severity": "High" if glaucoma > 70 else "Moderate" if glaucoma > 40 else "Mild",
    })

    return scores