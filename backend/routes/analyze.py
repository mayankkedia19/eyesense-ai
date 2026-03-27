from fastapi import APIRouter, File, UploadFile, HTTPException
import numpy as np
import cv2
from services.image_processing import analyze_eye_image

router = APIRouter(tags=["Analysis"])


@router.get("/health")
def health_check():
    return {
        "status":     "ok",
        "version":    "1.0.0",
        "mode":       "heuristic-fallback",
        "conditions": ["Anemia", "Cataract", "Glaucoma", "Normal"],
    }


@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: '{file.content_type}'. Upload JPEG or PNG."
        )

    contents = await file.read()

    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image too large. Max 10MB.")

    nparr = np.frombuffer(contents, np.uint8)
    img   = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(
            status_code=422,
            detail="Could not decode image. Try JPEG or PNG."
        )

    return analyze_eye_image(img)