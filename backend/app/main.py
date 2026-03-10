"""FastAPI 애플리케이션 진입점."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.tarot import router as tarot_router
from app.core.config import settings
from app.core.logging import logger

app = FastAPI(
    title="Arcana Love — AI Tarot API",
    description="AI 기반 사랑 타로 리딩 백엔드",
    version="0.1.0",
)

# CORS 설정 — 프론트엔드(Vite dev server)에서의 요청 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(tarot_router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.on_event("startup")
async def on_startup():
    logger.info("🔮 Arcana Love API 시작")
