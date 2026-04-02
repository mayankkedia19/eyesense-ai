# ============================================================
#  EyeSense — routes/analyze.py
# ============================================================

from fastapi import APIRouter, File, UploadFile, HTTPException
import numpy as np
import cv2
from services.image_processing import analyze_eye_image

router = APIRouter(tags=["Analysis"])


# ── Health Check ───────────────────────────────────────────────────────────────
# Final URL: GET /api/health
@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "version": "1.0.0",
        "mode": "heuristic-v3",
        "conditions_supported": ["Normal", "Anemia", "Cataract", "Glaucoma"],
    }


# ── Image Analysis ─────────────────────────────────────────────────────────────
# Final URL: POST /api/analyze  (main.py adds the /api prefix)
@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type: '{file.content_type}'. Please upload JPEG or PNG."
            )

        # Read & size-check
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Image too large. Max 10MB.")

        # Decode to OpenCV
        nparr = np.frombuffer(contents, np.uint8)
        img   = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=422, detail="Could not decode image. Try a valid JPEG or PNG.")

        # Run analysis
        result = analyze_eye_image(img)

        # ✅ Return shape the frontend expects: { data: { overallScore, conditions... } }
        return {
            "success": True,
            "message": "Analysis completed successfully",
            "data": {
                "overallScore":    result["overallScore"],
                "overallStatus":   result["overallStatus"],
                "conditions":      result["conditions"],
                "recommendations": result["recommendations"],
                "topCondition":    result["condition"],
                "confidence":      result["confidence"],
                "severity":        result["severity"],
                "model_used":      result["model_used"],
            }
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")