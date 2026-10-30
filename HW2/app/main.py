from __future__ import annotations

from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI

from app.database import Base, SessionLocal, engine
from app.orm import Master
from app.routers import categories, masters
from app.seed import seed_masters

@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_masters(db)
    yield

app = FastAPI(
    title="Beauty Salon API",
    description="API салона: категории услуг и мастера.",
    version="0.2.0",
    lifespan=lifespan,
)

app.include_router(categories.router)
app.include_router(masters.router)

@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok"}