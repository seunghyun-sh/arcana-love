"""OpenAI API에 보낼 프롬프트를 구성합니다."""

from __future__ import annotations

from app.domain.categories import LoveCategory
from app.domain.tarot_cards import TarotCard

POSITION_LABELS = {
    "self": "나의 감정 (My Feelings)",
    "other": "상대의 감정 (Their Feelings)",
    "flow": "관계의 흐름 (Relationship Flow)",
}

POSITIONS = ["self", "other", "flow"]


def build_system_prompt() -> str:
    return """\
당신은 사려 깊은 사랑 타로 리더입니다.

역할:
- 연애 상황에 맞게 타로 카드를 해석합니다.
- 한국어로 말합니다.
- 차분하고 감정적으로 지적인 어조를 유지합니다.
- 미래를 확신하듯 예언하지 않습니다.
- 공포감을 조장하지 않습니다.
- 뻔하거나 유치하게 말하지 않습니다.
- 과장하지 않습니다.
- 따뜻하되 현실적인 조언을 합니다.

응답 규칙:
- 반드시 아래 JSON 형식으로만 응답하세요. JSON 외의 텍스트를 포함하지 마세요.
- 모든 텍스트는 한국어로 작성하세요.

JSON 형식:
{
  "input_summary": "사용자 상황을 2-3문장으로 요약",
  "card_interpretations": [
    { "position": "self", "interpretation": "나의 감정 해석 (3-5문장)" },
    { "position": "other", "interpretation": "상대의 감정 해석 (3-5문장)" },
    { "position": "flow", "interpretation": "관계 흐름 해석 (3-5문장)" }
  ],
  "combined_reading": "세 카드를 종합한 관계 리딩 (5-8문장, 깊이 있는 통찰)",
  "advice": "짧고 따뜻한 한 줄 조언",
  "keyword": "이 리딩을 관통하는 핵심 키워드 한 단어"
}"""


def build_user_prompt(
    category: LoveCategory,
    situation: str,
    cards: list[TarotCard],
) -> str:
    card_sections: list[str] = []
    for i, (position, card) in enumerate(zip(POSITIONS, cards), 1):
        label = POSITION_LABELS[position]
        card_sections.append(
            f"""{i}. {label}
카드: {card.korean_name} ({card.english_name})
정위치 의미: {card.upright_meaning}
사랑 해석: {card.love_meanings[position]}
키워드: {', '.join(card.keywords)}"""
        )

    cards_text = "\n\n".join(card_sections)

    return f"""\
리딩 카테고리: {category.label}
카테고리 맥락: {category.prompt_lead}

사용자 상황:
{situation}

뽑힌 타로 카드:

{cards_text}

위 카드와 상황을 바탕으로 사랑 타로 리딩을 해주세요."""
