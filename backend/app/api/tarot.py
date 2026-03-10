"""타로 카드 뽑기 API 엔드포인트."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.core.logging import logger
from app.schemas.draw import (
    DrawRequest,
    DrawResponse,
    InterpretRequest,
    InterpretResponse,
    InterpretData,
    CardReading,
)
from app.services.draw_service import draw_cards
from app.services.llm_service import interpret_cards

router = APIRouter(prefix="/api/tarot", tags=["tarot"])


@router.post("/draw", response_model=DrawResponse)
async def draw(request: DrawRequest) -> DrawResponse:
    """78장 풀 덱에서 스프레드에 맞는 카드를 뽑아 반환합니다.

    - **spreadId**: 배열법 ID (e.g. 'contact_deep', 'some_basic')
    """
    try:
        result = draw_cards(request.spread_id)
        logger.info("카드 뽑기 완료: spread=%s, draw_id=%s", request.spread_id, result.data.draw_id)
        return result
    except ValueError as e:
        logger.warning("카드 뽑기 실패: %s", e)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error("카드 뽑기 중 예기치 않은 오류: %s", e, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="카드 뽑기 중 오류가 발생했습니다.",
        )


@router.post("/interpret", response_model=InterpretResponse)
async def interpret(request: InterpretRequest) -> InterpretResponse:
    """뽑힌 카드 데이터를 LLM에 보내 심층 해석을 받는다."""
    try:
        # LLM에 넘길 카드 데이터 구성
        cards_for_llm = [
            {
                "position": dp.position,
                "positionDesc": dp.position_desc,
                "cardNameKor": dp.card.name_kor,
                "cardNameEng": dp.card.name_eng,
                "arcanaType": dp.card.arcana_type,
                "isReversed": dp.card.is_reversed,
                "tone": dp.card.tone,
                "keywords": dp.card.keywords,
            }
            for dp in request.draw_data.drawn_cards
        ]

        result = await interpret_cards(
            spread_name=request.draw_data.spread_name,
            situation=request.situation,
            drawn_cards=cards_for_llm,
        )

        return InterpretResponse(
            success=True,
            data=InterpretData(
                cardReadings=[
                    CardReading(position=cr["position"], reading=cr["reading"])
                    for cr in result["cardReadings"]
                ],
                overallSummary=result["overallSummary"],
                finalScore=result["finalScore"],
            ),
        )
    except RuntimeError as e:
        logger.warning("LLM 해석 실패: %s", e)
        return InterpretResponse(success=False, error=str(e))
    except Exception as e:
        logger.error("LLM 해석 중 예기치 않은 오류: %s", e, exc_info=True)
        return InterpretResponse(success=False, error="해석 중 오류가 발생했습니다.")
