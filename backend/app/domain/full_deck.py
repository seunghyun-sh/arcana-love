"""78장 풀 타로 덱 — 메이저 아르카나 22장 + 마이너 아르카나 56장.

POST /api/tarot/draw 엔드포인트에서 사용합니다.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class FullDeckCard:
    """풀 덱 카드 한 장의 데이터."""

    id: str            # e.g. "major_00", "minor_cups_01"
    name_kor: str
    name_eng: str
    arcana_type: str   # "major" | "minor"


# ──────────────────────────────────────────
# 메이저 아르카나 (22장)
# ──────────────────────────────────────────

_MAJOR: list[FullDeckCard] = [
    FullDeckCard("major_00", "바보", "The Fool", "major"),
    FullDeckCard("major_01", "마법사", "The Magician", "major"),
    FullDeckCard("major_02", "여교황", "The High Priestess", "major"),
    FullDeckCard("major_03", "황후", "The Empress", "major"),
    FullDeckCard("major_04", "황제", "The Emperor", "major"),
    FullDeckCard("major_05", "교황", "The Hierophant", "major"),
    FullDeckCard("major_06", "연인", "The Lovers", "major"),
    FullDeckCard("major_07", "전차", "The Chariot", "major"),
    FullDeckCard("major_08", "힘", "Strength", "major"),
    FullDeckCard("major_09", "은둔자", "The Hermit", "major"),
    FullDeckCard("major_10", "운명의 수레바퀴", "Wheel of Fortune", "major"),
    FullDeckCard("major_11", "정의", "Justice", "major"),
    FullDeckCard("major_12", "매달린 사람", "The Hanged Man", "major"),
    FullDeckCard("major_13", "죽음", "Death", "major"),
    FullDeckCard("major_14", "절제", "Temperance", "major"),
    FullDeckCard("major_15", "악마", "The Devil", "major"),
    FullDeckCard("major_16", "탑", "The Tower", "major"),
    FullDeckCard("major_17", "별", "The Star", "major"),
    FullDeckCard("major_18", "달", "The Moon", "major"),
    FullDeckCard("major_19", "태양", "The Sun", "major"),
    FullDeckCard("major_20", "심판", "Judgement", "major"),
    FullDeckCard("major_21", "세계", "The World", "major"),
]

# ──────────────────────────────────────────
# 마이너 아르카나 (56장)
# ──────────────────────────────────────────

_SUIT_INFO = {
    "wands": ("완드", "Wands"),
    "cups": ("컵", "Cups"),
    "swords": ("소드", "Swords"),
    "pentacles": ("펜타클", "Pentacles"),
}

_COURT = ["Page", "Knight", "Queen", "King"]
_COURT_KOR = ["페이지", "나이트", "퀸", "킹"]


def _build_minor() -> list[FullDeckCard]:
    cards: list[FullDeckCard] = []
    for suit_key, (suit_kor, suit_eng) in _SUIT_INFO.items():
        # 에이스 ~ 10
        for num in range(1, 11):
            num_str = f"{num:02d}"
            if num == 1:
                kor = f"{suit_kor} 에이스"
                eng = f"Ace of {suit_eng}"
            else:
                kor = f"{suit_kor} {num}"
                eng = f"{num} of {suit_eng}"
            cards.append(
                FullDeckCard(
                    id=f"minor_{suit_key}_{num_str}",
                    name_kor=kor,
                    name_eng=eng,
                    arcana_type="minor",
                )
            )
        # 코트 카드 (Page, Knight, Queen, King)
        for court_eng, court_kor in zip(_COURT, _COURT_KOR):
            cards.append(
                FullDeckCard(
                    id=f"minor_{suit_key}_{court_eng.lower()}",
                    name_kor=f"{suit_kor}의 {court_kor}",
                    name_eng=f"{court_eng} of {suit_eng}",
                    arcana_type="minor",
                )
            )
    return cards


_MINOR: list[FullDeckCard] = _build_minor()

# 전체 78장
FULL_DECK: list[FullDeckCard] = _MAJOR + _MINOR

# id 기반 검색용
FULL_DECK_MAP: dict[str, FullDeckCard] = {c.id: c for c in FULL_DECK}
