from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router

app = FastAPI(title="EyeSense API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"status": "running"}