# ============================================================
#  EyeSense — main.py
# ============================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router

app = FastAPI(title="EyeSense API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ prefix="/api" means:
#    /health  → /api/health
#    /analyze → /api/analyze
app.include_router(analyze_router, prefix="/api")

@app.get("/")
def root():
    return {"status": "running", "message": "EyeSense API is live 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)