# backend/ocr-handler/service.py

from common.db import get_document, update_document_after_ocr, save_document_error
from common.textract import extract_text_from_s3
from common.constants import DOCUMENT_STATUS
from common.utils import now_iso


def handle_ocr(doc_id: str, user_id: str) -> dict:
    doc = get_document(doc_id, user_id)
    if not doc:
        raise ValueError("Document not found")

    s3_key = doc["s3_key"]
    ts = now_iso()

    try:
        raw_text = extract_text_from_s3(s3_key)
    except Exception as e:
        save_document_error(doc_id, user_id, str(e), ts)
        raise RuntimeError(f"OCR failed: {e}")

    update_document_after_ocr(
        doc_id=doc_id,
        user_id=user_id,
        raw_text=raw_text,
        status=DOCUMENT_STATUS["OCR_DONE"],
        updated_at=ts,
    )

    return {
        "doc_id": doc_id,
        "user_id": user_id,
        "status": DOCUMENT_STATUS["OCR_DONE"],
        "text_length": len(raw_text),
    }
