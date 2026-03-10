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
            SpreadPosition(1, "현재 나의 위치와 감정"),
            SpreadPosition(2, "상대의 속마음"),
            SpreadPosition(3, "이 관계의 향방"),
        ],
    ),
    "some_deep": SpreadDefinition(
        id="some_deep",
        name="숨겨진 진심과 미래 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "나의 진심"),
            SpreadPosition(2, "상대의 진심"),
            SpreadPosition(3, "다가올 계기"),
            SpreadPosition(4, "장애물"),
            SpreadPosition(5, "카드의 조언"),
        ],
    ),
    # ── 짝사랑 / Mutual Thoughts ──
    "crush_basic": SpreadDefinition(
        id="crush_basic",
        name="그 사람의 시선 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "상대가 보는 나의 모습"),
            SpreadPosition(2, "무의식적 호감의 정도"),
            SpreadPosition(3, "다가갈 타이밍"),
        ],
    ),
    "crush_deep": SpreadDefinition(
        id="crush_deep",
        name="관계 발전의 열쇠 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "현재 두 사람의 에너지"),
            SpreadPosition(2, "두 사람 사이의 벽"),
            SpreadPosition(3, "내가 취해야 할 행동"),
            SpreadPosition(4, "상대의 변화 가능성"),
            SpreadPosition(5, "맞이할 변화"),
        ],
    ),
    # ── 연락 / Text Now ──
    "contact_basic": SpreadDefinition(
        id="contact_basic",
        name="연락의 타이밍 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "닿았을 때의 반응"),
            SpreadPosition(2, "침묵했을 때의 흐름"),
            SpreadPosition(3, "당장을 위한 조언"),
        ],
    ),
    "contact_deep": SpreadDefinition(
        id="contact_deep",
        name="엇갈린 마음과 주파수 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "지난 오해의 실체"),
            SpreadPosition(2, "상대의 현재 감정"),
            SpreadPosition(3, "최적의 연락 방식"),
            SpreadPosition(4, "연락 후 예상되는 흐름"),
            SpreadPosition(5, "관계의 결론"),
        ],
    ),
    # ── 재회 / Reconciliation ──
    "reunion_basic": SpreadDefinition(
        id="reunion_basic",
        name="남겨진 미련의 조각 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "끊어진 인연의 이유"),
            SpreadPosition(2, "상대의 그리움"),
            SpreadPosition(3, "재회의 불씨"),
        ],
    ),
    "reunion_deep": SpreadDefinition(
        id="reunion_deep",
        name="운명의 재회선 (7장)",
        card_count=7,
        positions=[
            SpreadPosition(1, "나의 미련"),
            SpreadPosition(2, "상대의 미련"),
            SpreadPosition(3, "이별의 근본 원인"),
            SpreadPosition(4, "극복할 장벽"),
            SpreadPosition(5, "다시 닿을 방법"),
            SpreadPosition(6, "재회 후 관계의 변화"),
            SpreadPosition(7, "최종 결론"),
        ],
    ),
    # ── 연애운 / Love Luck ──
    "luck_3months": SpreadDefinition(
        id="luck_3months",
        name="계절의 연애 흐름 (3장)",
        card_count=3,
        positions=[
            SpreadPosition(1, "한 달 뒤 나에게 다가올 에너지"),
            SpreadPosition(2, "두 달 뒤 마주할 인연"),
            SpreadPosition(3, "세 달 뒤 관계의 모습"),
        ],
    ),
    "luck_soulmate": SpreadDefinition(
        id="luck_soulmate",
        name="운명의 붉은 실 (5장)",
        card_count=5,
        positions=[
            SpreadPosition(1, "나의 연애 성향"),
            SpreadPosition(2, "운명의 짝의 특징"),
            SpreadPosition(3, "만남의 계기"),
            SpreadPosition(4, "피해야 할 인연"),
            SpreadPosition(5, "기회가 찾아오는 시기"),
        ],
    ),
}
