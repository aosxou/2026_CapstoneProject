# backend/ai-analyzer/service.py

from common.db import (
    get_document,
    update_document_after_analysis,
    create_checklists,
    save_document_error,
    save_embedding,
)
from common.gemini import analyze_document
from common.embeddings import generate_embedding
from common.constants import DOCUMENT_STATUS, CHECKLIST_DEFAULT_COMPLETED
from common.utils import generate_id, now_iso, days_until, urgency_from_days


def handle_analysis(doc_id: str, user_id: str) -> dict:
    doc = get_document(doc_id, user_id)
    if not doc:
        raise ValueError("Document not found")

    raw_text = doc.get("raw_text", "")
    if not raw_text:
        raise ValueError("No OCR text found. Run OCR first.")

    ts = now_iso()

    try:
        analysis = analyze_document(raw_text)
    except Exception as e:
        save_document_error(doc_id, user_id, str(e), ts)
        raise RuntimeError(f"AI analysis failed: {e}")

    # Enrich deadlines with urgency
    for d in analysis.get("deadlines", []):
        try:
            d["urgency"] = urgency_from_days(days_until(d["date"]))
        except Exception:
            d["urgency"] = "normal"

    # Save analysis result to document
    update_document_after_analysis(
        doc_id=doc_id,
        user_id=user_id,
        document_type=analysis.get("document_type", ""),
        summary=analysis.get("summary", ""),
        analysis_result=analysis,
        status=DOCUMENT_STATUS["DONE"],
        updated_at=ts,
    )

    # Create checklist items in DynamoDB
    checklist_items = []
    for item in analysis.get("checklist_items", []):
        checklist_items.append({
            "checklist_id": generate_id("chk_"),
            "doc_id": doc_id,
            "user_id": user_id,
            "name": item.get("name", ""),
            "description": item.get("description", ""),
            "completed": CHECKLIST_DEFAULT_COMPLETED,
            "due_date": item.get("due_date"),
            "created_at": ts,
            "updated_at": ts,
        })
    if checklist_items:
        create_checklists(checklist_items)

    # Generate and save embedding for vector search
    try:
        embedding_text = f"{analysis.get('document_type', '')} {analysis.get('summary', '')} {raw_text[:1000]}"
        embedding = generate_embedding(embedding_text)
        save_embedding(
            doc_id=doc_id,
            user_id=user_id,
            embedding=embedding,
            document_type=analysis.get("document_type", ""),
            summary=analysis.get("summary", ""),
            updated_at=ts,
        )
    except Exception:
        pass  # Embedding failure should not block the main flow

    return {
        "doc_id": doc_id,
        "status": DOCUMENT_STATUS["DONE"],
        "document_type": analysis.get("document_type", ""),
        "deadlines_count": len(analysis.get("deadlines", [])),
        "checklist_count": len(checklist_items),
        "calendar_events_count": len(analysis.get("calendar_events", [])),
    }
