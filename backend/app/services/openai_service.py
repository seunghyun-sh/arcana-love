"""OpenAI API 통합 서비스."""

from __future__ import annotations

import json

from openai import AsyncOpenAI

from app.core.config import settings
from app.core.logging import logger


_client: AsyncOpenAI | None = None


def get_openai_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(api_key=settings.openai_api_key)
    return _client


async def generate_tarot_reading(
    system_prompt: str,
    user_prompt: str,
) -> dict:
    """OpenAI에 타로 리딩 요청을 보내고 파싱된 JSON을 반환합니다."""
    client = get_openai_client()

    logger.info("OpenAI API 호출 시작 (model=%s)", settings.openai_model)

    response = await client.chat.completions.create(
        model=settings.openai_model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        max_completion_tokens=2000,
        response_format={"type": "json_object"},
    )

    raw_content = response.choices[0].message.content
    logger.info("OpenAI API 응답 수신 완료")

    try:
        result = json.loads(raw_content)
    except json.JSONDecodeError as e:
        logger.error("OpenAI 응답 JSON 파싱 실패: %s", e)
        raise ValueError("AI 응답을 파싱할 수 없습니다.") from e

    return result
