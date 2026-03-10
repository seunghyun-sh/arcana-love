"""POST /api/tarot/draw 스키마."""

from __future__ import annotations

from pydantic import BaseModel, Field


# ── Request ──

class DrawRequest(BaseModel):
    """카드 뽑기 요청."""

    spread_id: str = Field(
        ...,
        alias="spreadId",
        description="프론트엔드에서 선택한 배열법 ID (e.g. 'contact_deep')",
    )


# ── Response ──

class DrawnCardInfo(BaseModel):
    """뽑힌 카드 한 장."""

    id: str
    name_kor: str = Field(alias="nameKor")
    name_eng: str = Field(alias="nameEng")
    arcana_type: str = Field(alias="arcanaType")
    is_reversed: bool = Field(alias="isReversed")
    tone: str = ""
    keywords: list[str] = Field(default_factory=list)

    model_config = {"populate_by_name": True}


class DrawnPosition(BaseModel):
    """뽑힌 카드와 위치 정보."""

    position: int
    position_desc: str = Field(alias="positionDesc")
    card: DrawnCardInfo
    interpretation: str = ""

    model_config = {"populate_by_name": True}


class DrawData(BaseModel):
    """draw 응답 data 필드."""

    draw_id: str = Field(alias="drawId")
    spread_id: str = Field(alias="spreadId")
    spread_name: str = Field(alias="spreadName")
    drawn_cards: list[DrawnPosition] = Field(alias="drawnCards")

    model_config = {"populate_by_name": True}


class DrawResponse(BaseModel):
    """POST /api/tarot/draw 응답."""

    success: bool
    data: DrawData

    model_config = {"populate_by_name": True}


# ── Interpret (LLM) ──


class InterpretRequest(BaseModel):
    """LLM 해석 요청 — draw 결과를 그대로 넘긴다."""

    draw_data: DrawData = Field(alias="drawData")
    situation: str = ""

    model_config = {"populate_by_name": True}


class CardReading(BaseModel):
    """LLM이 생성한 개별 카드 해석."""

    position: int
    reading: str


class InterpretData(BaseModel):
    """LLM 해석 결과."""

    card_readings: list[CardReading] = Field(alias="cardReadings")
    overall_summary: str = Field(alias="overallSummary")
    final_score: int = Field(alias="finalScore")

    model_config = {"populate_by_name": True}


class InterpretResponse(BaseModel):
    """POST /api/tarot/interpret 응답."""

    success: bool
    data: InterpretData | None = None
    error: str | None = None

    model_config = {"populate_by_name": True}
