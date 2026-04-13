# backend/common/utils.py

import uuid
import json
import base64
from datetime import datetime, timedelta
from typing import Any, Dict, Optional

from common.constants import DEFAULT_TIMEZONE


def generate_id(prefix: str = "") -> str:
    short_id = uuid.uuid4().hex[:12]
    return f"{prefix}{short_id}" if prefix else short_id


def now_iso() -> str:
    return datetime.utcnow().isoformat() + "Z"


def parse_body(event: Dict[str, Any]) -> Dict[str, Any]:
    body = event.get("body", "{}")
    if not body:
        return {}
    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8")
    return json.loads(body)


def get_path_param(event: Dict[str, Any], name: str) -> Optional[str]:
    params = event.get("pathParameters") or {}
    return params.get(name)


def get_query_param(event: Dict[str, Any], name: str) -> Optional[str]:
    params = event.get("queryStringParameters") or {}
    return params.get(name)


def get_user_id(event: Dict[str, Any]) -> Optional[str]:
    return get_query_param(event, "user_id") or get_path_param(event, "user_id")


def days_until(date_str: str) -> int:
    target = datetime.fromisoformat(date_str.replace("Z", ""))
    now = datetime.utcnow()
    return (target.date() - now.date()).days


def urgency_from_days(days: int) -> str:
    if days <= 3:
        return "high"
    if days <= 7:
        return "normal"
    return "low"
