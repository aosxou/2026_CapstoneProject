# backend/common/gemini.py

import os
import json
from typing import Dict, Any

import google.generativeai as genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash")

genai.configure(api_key=GEMINI_API_KEY)

ANALYSIS_PROMPT = """
당신은 문서 분석 AI입니다.
아래 문서 텍스트를 분석하여 다음 JSON 형식으로 정확히 응답하세요.

{
  "document_type": "문서 유형 (예: 장학금 공고, 계약서, 안내문 등)",
  "summary": "문서 핵심 내용 요약 (3~5문장)",
  "deadlines": [
    {
      "date": "YYYY-MM-DD",
      "description": "마감 항목 설명"
    }
  ],
  "checklist_items": [
    {
      "name": "할 일 항목",
      "description": "상세 설명",
      "due_date": "YYYY-MM-DD 또는 null"
    }
  ],
  "calendar_events": [
    {
      "title": "일정 제목",
      "date": "YYYY-MM-DD",
      "time": "HH:MM",
      "description": "일정 설명"
    }
  ]
}

중요:
- 반드시 유효한 JSON만 출력하세요. 설명이나 마크다운 없이 JSON만 응답.
- 날짜를 특정할 수 없으면 해당 항목을 빈 배열로 두세요.
- 체크리스트는 사용자가 해야 할 행동 위주로 추출하세요.

--- 문서 텍스트 ---
{text}
"""


def analyze_document(raw_text: str) -> Dict[str, Any]:
    model = genai.GenerativeModel(GEMINI_MODEL)
    prompt = ANALYSIS_PROMPT.replace("{text}", raw_text)

    response = model.generate_content(prompt)
    result_text = response.text.strip()

    # Strip markdown code fences if present
    if result_text.startswith("```"):
        lines = result_text.split("\n")
        lines = [l for l in lines if not l.startswith("```")]
        result_text = "\n".join(lines)

    return json.loads(result_text)
