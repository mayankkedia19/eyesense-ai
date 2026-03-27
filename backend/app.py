from fastapi import APIRouter, File, UploadFile, HTTPException
import numpy as np
import cv2
from services.image_processing import analyze_eye_image

router = APIRouter(prefix="/api", tags=["EyeSense"])


@router.get("/health")
def health():
    return {"status": "ok", "model": "color-heuristic-v1", "version": "0.2.0"}


@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are accepted.")

    contents = await file.read()

    if len(contents) > 10 * 1024 * 1024:  # 10MB cap
        raise HTTPException(status_code=413, detail="Image too large. Max 10MB.")

    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=422, detail="Could not decode image. Try JPEG or PNG.")

    return analyze_eye_image(img)
    from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router

app = FastAPI(
    title="EyeSense API",
    description="Non-invasive early eye condition detection",
    version="0.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def home():
    return {"message": "EyeSense API is running 🚀"}