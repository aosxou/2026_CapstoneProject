# backend/upload-handler/service.py

from common.utils import generate_id, now_iso
from common.validators import validate_upload_request, validate_mime_type
from common.s3 import upload_file_base64, build_s3_key
from common.db import create_document
from common.constants import DOCUMENT_STATUS


def handle_upload(body: dict) -> dict:
    valid, err = validate_upload_request(body)
    if not valid:
        raise ValueError(err)

    user_id = body["user_id"]
    file_name = body["file_name"]
    mime_type = body["mime_type"]
    file_content = body["file_content"]  # base64 encoded

    if not validate_mime_type(mime_type):
        raise ValueError(f"Unsupported file type: {mime_type}")

    doc_id = generate_id("doc_")
    s3_key = build_s3_key(user_id, doc_id, file_name)
    now = now_iso()

    # Upload to S3
    upload_file_base64(s3_key, file_content, mime_type)

    # Create document record in DynamoDB
    item = {
        "doc_id": doc_id,
        "user_id": user_id,
        "original_file_name": file_name,
        "s3_key": s3_key,
        "mime_type": mime_type,
        "status": DOCUMENT_STATUS["UPLOADED"],
        "created_at": now,
        "updated_at": now,
    }
    create_document(item)

    return item
