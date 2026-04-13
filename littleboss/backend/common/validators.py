# backend/common/validators.py

import re
from typing import List, Optional, Tuple

from common.constants import SUPPORTED_MIME_TYPES


ALLOWED_MIME_TYPES: List[str] = list(SUPPORTED_MIME_TYPES.values())

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def validate_mime_type(mime_type: str) -> bool:
    return mime_type in ALLOWED_MIME_TYPES


def validate_file_size(size_bytes: int) -> bool:
    return 0 < size_bytes <= MAX_FILE_SIZE


def validate_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))


def validate_required_fields(
    data: dict, fields: List[str]
) -> Tuple[bool, Optional[str]]:
    for f in fields:
        if f not in data or data[f] is None or data[f] == "":
            return False, f"Missing required field: {f}"
    return True, None


def validate_upload_request(data: dict) -> Tuple[bool, Optional[str]]:
    return validate_required_fields(
        data, ["user_id", "file_name", "mime_type", "file_content"]
    )


def validate_date_string(date_str: str) -> bool:
    pattern = r"^\d{4}-\d{2}-\d{2}"
    return bool(re.match(pattern, date_str))
