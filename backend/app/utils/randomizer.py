"""카드 랜덤 선택 유틸리티."""

from __future__ import annotations

import secrets
from typing import Sequence, TypeVar

T = TypeVar("T")


def select_random_cards(cards: Sequence[T], count: int = 3) -> list[T]:
    """중복 없이 `count`장의 카드를 암호학적으로 안전한 방법으로 선택합니다."""
    if count > len(cards):
        raise ValueError(f"{count}장을 뽑으려면 최소 {count}장이 필요합니다.")

    indices = list(range(len(cards)))
    selected: list[T] = []
    for _ in range(count):
        idx = secrets.randbelow(len(indices))
        selected.append(cards[indices[idx]])
        indices[idx] = indices[-1]
        indices.pop()
    return selected
