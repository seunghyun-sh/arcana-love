"""타로 리딩 비즈니스 로직을 담당하는 서비스."""

from __future__ import annotations

from app.domain.categories import LOVE_CATEGORIES, LoveCategory
from app.domain.tarot_cards import ALL_CARDS, TarotCard
from app.schemas.request import TarotReadingRequest
from app.schemas.response import CardReading, CategoryInfo, TarotReadingResponse
from app.services.openai_service import generate_tarot_reading
from app.services.prompt_builder import (
    POSITION_LABELS,
    POSITIONS,
    build_system_prompt,
    build_user_prompt,
)
from app.utils.randomizer import select_random_cards
from app.core.logging import logger


class TarotService:
    """타로 리딩 생성 서비스."""

    async def create_reading(self, request: TarotReadingRequest) -> TarotReadingResponse:
        """전체 타로 리딩 파이프라인을 실행합니다.

        1. 입력 검증
        2. 카테고리 조회
        3. 랜덤 카드 3장 선택
        4. 프롬프트 생성
        5. OpenAI 호출
        6. 결과 파싱
        7. 구조화된 응답 반환
        """
        # 1. 카테고리 조회
        category = self._get_category(request.category)
        logger.info("리딩 시작: category=%s", category.id)

        # 2. 랜덤 카드 선택
        cards = select_random_cards(ALL_CARDS, count=3)
        logger.info(
            "카드 선택: %s",
            [f"{c.korean_name}({c.english_name})" for c in cards],
        )

        # 3. 프롬프트 생성
        system_prompt = build_system_prompt()
        user_prompt = build_user_prompt(category, request.situation, cards)

        # 4. OpenAI 호출
        ai_result = await generate_tarot_reading(system_prompt, user_prompt)

        # 5. 응답 구조화
        return self._build_response(category, cards, ai_result)

    def _get_category(self, category_id: str) -> LoveCategory:
        category = LOVE_CATEGORIES.get(category_id)
        if category is None:
            raise ValueError(f"알 수 없는 카테고리: {category_id}")
        return category

    def _build_response(
        self,
        category: LoveCategory,
        cards: list[TarotCard],
        ai_result: dict,
    ) -> TarotReadingResponse:
        """OpenAI 응답을 프론트엔드 친화적인 구조로 변환합니다."""
        card_interpretations = {
            ci["position"]: ci["interpretation"]
            for ci in ai_result.get("card_interpretations", [])
        }

        card_readings: list[CardReading] = []
        for position, card in zip(POSITIONS, cards):
            card_readings.append(
                CardReading(
                    position=position,
                    label=POSITION_LABELS[position],
                    english_name=card.english_name,
                    korean_name=card.korean_name,
                    interpretation=card_interpretations.get(
                        position, card.love_meanings.get(position, "")
                    ),
                )
            )

        return TarotReadingResponse(
            category=CategoryInfo(
                id=category.id,
                label=category.label,
                question=category.subtitle,
            ),
            input_summary=ai_result.get("input_summary", ""),
            cards=card_readings,
            combined_reading=ai_result.get("combined_reading", ""),
            advice=ai_result.get("advice", ""),
            keyword=ai_result.get("keyword", ""),
        )


tarot_service = TarotService()
