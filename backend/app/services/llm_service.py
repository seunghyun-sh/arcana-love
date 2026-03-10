"""LLM 호출 서비스 — OpenAI API를 통한 타로 해석."""

from __future__ import annotations

import json
import logging
from typing import Any

import httpx

from app.core.config import settings
from app.services.prompt_builder import SYSTEM_PROMPT, build_user_message

logger = logging.getLogger(__name__)

_OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions"


async def interpret_cards(
    spread_name: str,
    situation: str,
    drawn_cards: list[dict[str, Any]],
) -> dict[str, Any]:
    """OpenAI Chat API를 호출해 타로 해석 JSON을 반환한다.

    Returns:
        {"cardReadings": [...], "overallSummary": "...", "finalScore": int}
    Raises:
        RuntimeError if LLM call fails or response is unparseable.
    """
    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY가 설정되지 않았습니다.")

    user_msg = build_user_message(spread_name, situation, drawn_cards)

    payload = {
        "model": settings.openai_model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ],
        "response_format": {"type": "json_object"},
        "max_completion_tokens": 8192,
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(
            _OPENAI_CHAT_URL,
            headers={
                "Authorization": f"Bearer {settings.openai_api_key}",
                "Content-Type": "application/json",
            },
            json=payload,
        )

    if resp.status_code != 200:
        logger.error("OpenAI API error %s: %s", resp.status_code, resp.text[:500])
        raise RuntimeError(f"OpenAI API 오류 (HTTP {resp.status_code})")

    body = resp.json()
    logger.debug("OpenAI raw response: %s", json.dumps(body, ensure_ascii=False)[:1000])

    choice = body.get("choices", [{}])[0]
    finish = choice.get("finish_reason", "")
    raw = choice.get("message", {}).get("content") or ""

    if not raw.strip():
        # content가 비어 있으면 refusal / length / 기타 원인 로깅
        refusal = choice.get("message", {}).get("refusal")
        logger.error(
            "OpenAI content 비어있음 — finish_reason=%s, refusal=%s, choice=%s",
            finish, refusal, json.dumps(choice, ensure_ascii=False)[:500],
        )
        raise RuntimeError(f"LLM 응답이 비어있습니다 (finish_reason={finish})")

    try:
        result = json.loads(raw)
    except json.JSONDecodeError as e:
        logger.error("LLM JSON 파싱 실패: %s — raw=%s", e, raw[:300])
        raise RuntimeError("LLM 응답 파싱 실패") from e

    # 최소 검증
    if "cardReadings" not in result or "overallSummary" not in result:
        logger.error("LLM 응답 스키마 불일치: %s", list(result.keys()))
        raise RuntimeError("LLM 응답 스키마 불일치")

    # finalScore 정수 보장
    score = result.get("finalScore", 50)
    result["finalScore"] = max(0, min(100, int(score)))

    return result
