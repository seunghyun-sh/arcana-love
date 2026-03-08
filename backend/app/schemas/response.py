from __future__ import annotations

from pydantic import BaseModel


class CategoryInfo(BaseModel):
    id: str
    label: str
    question: str


class CardReading(BaseModel):
    position: str
    label: str
    english_name: str
    korean_name: str
    interpretation: str


class TarotReadingResponse(BaseModel):
    """POST /api/tarot/readings 응답 바디."""

    category: CategoryInfo
    input_summary: str
    cards: list[CardReading]
    combined_reading: str
    advice: str
    keyword: str
