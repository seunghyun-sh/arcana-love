"""카테고리(질문 유형) 도메인 데이터.

프론트엔드의 src/data/questions.ts 와 동기화되어 있습니다.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class LoveCategory:
    id: str
    label: str
    subtitle: str
    prompt_lead: str


LOVE_CATEGORIES: dict[str, LoveCategory] = {
    "situationship": LoveCategory(
        id="situationship",
        label="썸 / Situationship",
        subtitle="이 애매한 관계가 이어질 가능성을 읽습니다.",
        prompt_lead="이 situationship의 다음 장면을 묻는 질문에 대해 카드는 관계의 지속 가능성과 온도차를 함께 보여 줍니다.",
    ),
    "mutualThoughts": LoveCategory(
        id="mutualThoughts",
        label="상대의 마음 / Mutual Thoughts",
        subtitle="상대의 시선과 감정의 잔상을 읽습니다.",
        prompt_lead="상대가 당신을 얼마나 자주, 얼마나 깊이 떠올리는지에 대한 질문에 카드는 감정의 밀도와 표현 방식을 드러냅니다.",
    ),
    "textNow": LoveCategory(
        id="textNow",
        label="연락 타이밍 / Text Now",
        subtitle="지금 연락하는 타이밍이 맞는지 봅니다.",
        prompt_lead="지금 메시지를 보내도 될지에 대한 질문에 카드는 행동의 타이밍과 감정의 수용도를 중심으로 답합니다.",
    ),
    "reconciliation": LoveCategory(
        id="reconciliation",
        label="재회 가능성 / Reconciliation",
        subtitle="다시 이어질 수 있는 흐름이 있는지 살핍니다.",
        prompt_lead="재회를 바라는 마음에 대해 카드는 남아 있는 감정, 미해결된 과제, 다시 만날 가능성의 결을 읽어 줍니다.",
    ),
    "loveLuck": LoveCategory(
        id="loveLuck",
        label="올해 연애운 / Love Luck",
        subtitle="올해의 연애 운과 흐름을 넓게 살핍니다.",
        prompt_lead="올해 연애 운의 방향을 묻는 질문에 카드는 당신의 감정 습관, 끌어당기는 인연, 관계의 흐름을 입체적으로 보여 줍니다.",
    ),
}
