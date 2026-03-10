"""카드 뽑기(draw) 서비스 — stateless 설계.

78장 풀 덱에서 스프레드에 맞는 장수를 뽑고, 정/역방향을 부여합니다.
"""

from __future__ import annotations

import secrets
import uuid

from app.domain.full_deck import FULL_DECK, FullDeckCard
from app.domain.spreads import SPREADS, SpreadDefinition
from app.schemas.draw import (
    DrawData,
    DrawResponse,
    DrawnCardInfo,
    DrawnPosition,
)


def _pick_random_cards(count: int) -> list[FullDeckCard]:
    """78장에서 중복 없이 count장을 암호학적으로 안전하게 뽑는다."""
    indices = list(range(len(FULL_DECK)))
    picked: list[FullDeckCard] = []
    for _ in range(count):
        idx = secrets.randbelow(len(indices))
        picked.append(FULL_DECK[indices[idx]])
        indices[idx] = indices[-1]
        indices.pop()
    return picked


def _random_reversed() -> bool:
    """약 30 % 확률로 역방향."""
    return secrets.randbelow(100) < 30


def draw_cards(spread_id: str) -> DrawResponse:
    """spread_id를 받아 카드를 뽑고 DrawResponse를 반환한다."""
    spread: SpreadDefinition | None = SPREADS.get(spread_id)
    if spread is None:
        raise ValueError(f"알 수 없는 배열법: {spread_id}")

    cards = _pick_random_cards(spread.card_count)
    draw_id = f"draw_{uuid.uuid4().hex[:16]}"

    drawn_positions: list[DrawnPosition] = []
    for pos_def, card in zip(spread.positions, cards):
        drawn_positions.append(
            DrawnPosition(
                position=pos_def.position,
                positionDesc=pos_def.description,
                card=DrawnCardInfo(
                    id=card.id,
                    nameKor=card.name_kor,
                    nameEng=card.name_eng,
                    arcanaType=card.arcana_type,
                    isReversed=_random_reversed(),
                ),
            )
        )

    return DrawResponse(
        success=True,
        data=DrawData(
            drawId=draw_id,
            spreadId=spread.id,
            spreadName=spread.name,
            drawnCards=drawn_positions,
        ),
    )
