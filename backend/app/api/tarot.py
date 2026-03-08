"""타로 리딩 API 엔드포인트."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.core.logging import logger
from app.schemas.request import TarotReadingRequest
from app.schemas.response import TarotReadingResponse
from app.services.tarot_service import tarot_service

router = APIRouter(prefix="/api/tarot", tags=["tarot"])


@router.post("/readings", response_model=TarotReadingResponse)
async def create_reading(request: TarotReadingRequest) -> TarotReadingResponse:
    """AI 기반 사랑 타로 리딩을 생성합니다.

    - **category**: 질문 카테고리 (situationship, mutualThoughts, textNow, reconciliation, loveLuck)
    - **situation**: 사용자가 입력한 현재 연애 상황 (2~1000자)
    """
    try:
        return await tarot_service.create_reading(request)
    except ValueError as e:
        logger.warning("리딩 요청 처리 실패: %s", e)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error("리딩 생성 중 예기치 않은 오류: %s", e, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="리딩 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        )
