from __future__ import annotations

from fastapi import FastAPI

from app.routers import categories

app = FastAPI(
    title="Beauty Salon API",
    description="API салона красоты: категории услуг и их наполнение.",
    version="0.1.0",
)

app.include_router(categories.router)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok"}
