from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

LoveQuestionId = Literal[
    "situationship",
    "mutualThoughts",
    "textNow",
    "reconciliation",
    "loveLuck",
]


class TarotReadingRequest(BaseModel):
    """POST /api/tarot/readings 요청 바디."""

    category: LoveQuestionId
    situation: str = Field(
        ...,
        min_length=2,
        max_length=1000,
        description="사용자가 입력한 연애 상황 설명",
    )
