"""스프레드(배열법) 정의.

프론트엔드의 SPREAD_OPTIONS와 동기화됩니다.
각 스프레드는 id, 이름, 카드 수, 위치별 설명을 포함합니다.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class SpreadPosition:
    """스프레드 내 한 위치."""

    position: int       # 1-based
    description: str    # 이 위치가 의미하는 것
    meaning_key: str = "flow"  # "self" | "other" | "flow" → love_meanings 키


@dataclass(frozen=True)
class SpreadDefinition:
    """하나의 배열법 정의."""

    id: str
    name: str
    card_count: int
    positions: list[SpreadPosition] = field(default_factory=list)


SPREADS: dict[str, SpreadDefinition] = {
    # ── 썸 / Situationship ──
    "some_basic": SpreadDefinition(
        id="some_basic",
        name="관계의 나침반 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "현재 나의 위치와 감정", "self"),
            SpreadPosition(2, "상대의 속마음", "other"),
            SpreadPosition(3, "이 관계의 향방", "flow"),
        ],
    ),
    "some_deep": SpreadDefinition(
        id="some_deep",
        name="숨겨진 진심과 미래 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "나의 진심", "self"),
            SpreadPosition(2, "상대의 진심", "other"),
            SpreadPosition(3, "다가올 계기", "flow"),
            SpreadPosition(4, "장애물", "flow"),
            SpreadPosition(5, "카드의 조언", "self"),
        ],
    ),
    # ── 짝사랑 / Mutual Thoughts ──
    "crush_basic": SpreadDefinition(
        id="crush_basic",
        name="그 사람의 시선 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "상대가 보는 나의 모습", "other"),
            SpreadPosition(2, "무의식적 호감의 정도", "other"),
            SpreadPosition(3, "다가갈 타이밍", "flow"),
        ],
    ),
    "crush_deep": SpreadDefinition(
        id="crush_deep",
        name="관계 발전의 열쇠 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "현재 두 사람의 에너지", "flow"),
            SpreadPosition(2, "두 사람 사이의 벽", "flow"),
            SpreadPosition(3, "내가 취해야 할 행동", "self"),
            SpreadPosition(4, "상대의 변화 가능성", "other"),
            SpreadPosition(5, "맞이할 변화", "flow"),
        ],
    ),
    # ── 연락 / Text Now ──
    "contact_basic": SpreadDefinition(
        id="contact_basic",
        name="연락의 타이밍 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "닿았을 때의 반응", "other"),
            SpreadPosition(2, "침묵했을 때의 흐름", "flow"),
            SpreadPosition(3, "당장을 위한 조언", "self"),
        ],
    ),
    "contact_deep": SpreadDefinition(
        id="contact_deep",
        name="엇갈린 마음과 주파수 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "지난 오해의 실체", "flow"),
            SpreadPosition(2, "상대의 현재 감정", "other"),
            SpreadPosition(3, "최적의 연락 방식", "self"),
            SpreadPosition(4, "연락 후 예상되는 흐름", "flow"),
            SpreadPosition(5, "관계의 결론", "flow"),
        ],
    ),
    # ── 재회 / Reconciliation ──
    "reunion_basic": SpreadDefinition(
        id="reunion_basic",
        name="남겨진 미련의 조각 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "끊어진 인연의 이유", "flow"),
            SpreadPosition(2, "상대의 그리움", "other"),
            SpreadPosition(3, "재회의 불씨", "flow"),
        ],
    ),
    "reunion_deep": SpreadDefinition(
        id="reunion_deep",
        name="운명의 재회선 (7장)",
        card_count=7,
        positions=[
            SpreadPosition(1, "나의 미련", "self"),
            SpreadPosition(2, "상대의 미련", "other"),
            SpreadPosition(3, "이별의 근본 원인", "flow"),
            SpreadPosition(4, "극복할 장벽", "flow"),
            SpreadPosition(5, "다시 닿을 방법", "self"),
            SpreadPosition(6, "재회 후 관계의 변화", "flow"),
            SpreadPosition(7, "최종 결론", "flow"),
        ],
    ),
    # ── 연애운 / Love Luck ──
    "luck_3months": SpreadDefinition(
        id="luck_3months",
        name="계절의 연애 흐름 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "한 달 뒤 나에게 다가올 에너지", "self"),
            SpreadPosition(2, "두 달 뒤 마주할 인연", "other"),
            SpreadPosition(3, "세 달 뒤 관계의 모습", "flow"),
        ],
    ),
    "luck_soulmate": SpreadDefinition(
        id="luck_soulmate",
        name="운명의 붉은 실 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "나의 연애 성향", "self"),
            SpreadPosition(2, "운명의 짝의 특징", "other"),
            SpreadPosition(3, "만남의 계기", "flow"),
            SpreadPosition(4, "피해야 할 인연", "other"),
            SpreadPosition(5, "기회가 찾아오는 시기", "flow"),
        ],
    ),
    # ── 커플 / Couple ──
    "couple_basic": SpreadDefinition(
        id="couple_basic",
        name="관계의 온도 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "현재 우리 두 사람의 관계 상태와 표면적인 분위기", "flow"),
            SpreadPosition(2, "조만간 다가올 수 있는 갈등 요소나 주의해야 할 위기", "flow"),
            SpreadPosition(3, "위기를 넘겼을 때 맞이하게 될 우리 관계의 가까운 미래", "flow"),
        ],
    ),
    "couple_deep": SpreadDefinition(
        id="couple_deep",
        name="두 사람의 궤도 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "이 관계 안에서 내가 느끼는 진짜 속마음", "self"),
            SpreadPosition(2, "상대방이 나를 대하는 태도와 그 이면의 진짜 속마음", "other"),
            SpreadPosition(3, "두 사람이 겉으로 말하지 못하고 있는 숨은 장애물이나 현실적 제약", "flow"),
            SpreadPosition(4, "관계를 더 단단하게 만들기 위해 서로가 노력해야 할 점", "flow"),
            SpreadPosition(5, "이대로 만남을 이어갈 경우 두 사람이 도달하게 될 최종 결과", "flow"),
        ],
    ),
    # ── 궁합 / Chemistry ──
    "chemistry_basic": SpreadDefinition(
        id="chemistry_basic",
        name="주파수 매칭 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "내가 가진 타고난 연애 성향과 에너지", "self"),
            SpreadPosition(2, "상대방이 가진 타고난 연애 성향과 에너지", "other"),
            SpreadPosition(3, "이 두 에너지가 결합했을 때 발생하는 시너지", "flow"),
        ],
    ),
    "chemistry_deep": SpreadDefinition(
        id="chemistry_deep",
        name="거울과 그림자 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "두 사람이 서로에게 강렬하게 끌리는 긍정적인 이유", "flow"),
            SpreadPosition(2, "두 사람이 사귀게 될 경우 반드시 부딪히게 될 갈등 포인트", "flow"),
            SpreadPosition(3, "상대방의 단점이나 그림자를 내가 어떻게 포용해야 하는가", "self"),
            SpreadPosition(4, "이 사람이 내 인생에 들어왔을 때 나에게 미칠 영향력", "flow"),
            SpreadPosition(5, "카드가 평가하는 두 사람의 운명적인 궁합과 최종 조언", "flow"),
        ],
    ),
}
