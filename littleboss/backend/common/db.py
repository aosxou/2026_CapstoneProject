# backend/common/db.py

import os
from typing import Any, Dict, List, Optional

import boto3
from boto3.dynamodb.conditions import Key


# =========================
# Environment variables
# =========================
DOCUMENTS_TABLE = os.environ.get("DOCUMENTS_TABLE", "littleboss-documents")
CHECKLISTS_TABLE = os.environ.get("CHECKLISTS_TABLE", "littleboss-checklists")
USERS_TABLE = os.environ.get("USERS_TABLE", "littleboss-users")


# =========================
# DynamoDB resource / tables
# =========================
dynamodb = boto3.resource("dynamodb")

documents_table = dynamodb.Table(DOCUMENTS_TABLE)
checklists_table = dynamodb.Table(CHECKLISTS_TABLE)
users_table = dynamodb.Table(USERS_TABLE)


# =========================
# Users table
# =========================
def create_user(item: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a user item.
    """
    users_table.put_item(Item=item)
    return item


def get_user(user_id: str) -> Optional[Dict[str, Any]]:
    """
    Get a user by user_id.
    """
    response = users_table.get_item(
        Key={"user_id": user_id}
    )
    return response.get("Item")


def update_user_tokens(
    user_id: str,
    access_token: str,
    refresh_token: str,
    token_expiry: str,
    updated_at: str
) -> None:
    """
    Update Google Calendar OAuth token fields for a user.
    """
    users_table.update_item(
        Key={"user_id": user_id},
        UpdateExpression="""
            SET calendar_access_token = :access_token,
                calendar_refresh_token = :refresh_token,
                token_expiry = :token_expiry,
                updated_at = :updated_at
        """,
        ExpressionAttributeValues={
            ":access_token": access_token,
            ":refresh_token": refresh_token,
            ":token_expiry": token_expiry,
            ":updated_at": updated_at,
        }
    )


# =========================
# Documents table
# =========================
def create_document(item: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a document item.
    Required keys should include at least:
    - doc_id
    - user_id
    """
    documents_table.put_item(Item=item)
    return item


def get_document(doc_id: str, user_id: str) -> Optional[Dict[str, Any]]:
    """
    Get a document by composite key (doc_id, user_id).
    """
    response = documents_table.get_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        }
    )
    return response.get("Item")


def get_documents_by_user(user_id: str) -> List[Dict[str, Any]]:
    """
    Get all documents for a user using GSI: user_id-index
    """
    response = documents_table.query(
        IndexName="user_id-index",
        KeyConditionExpression=Key("user_id").eq(user_id)
    )
    return response.get("Items", [])


def update_document_status(
    doc_id: str,
    user_id: str,
    status: str,
    updated_at: str
) -> None:
    """
    Update only the document processing status.
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="SET #status = :status, updated_at = :updated_at",
        ExpressionAttributeNames={
            "#status": "status"
        },
        ExpressionAttributeValues={
            ":status": status,
            ":updated_at": updated_at
        }
    )


def save_raw_text(
    doc_id: str,
    user_id: str,
    raw_text: str,
    updated_at: str
) -> None:
    """
    Save OCR extracted text to the document item.
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="SET raw_text = :raw_text, updated_at = :updated_at",
        ExpressionAttributeValues={
            ":raw_text": raw_text,
            ":updated_at": updated_at
        }
    )


def save_analysis_result(
    doc_id: str,
    user_id: str,
    analysis_result: Dict[str, Any],
    updated_at: str
) -> None:
    """
    Save AI analysis result JSON to the document item.
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="""
            SET analysis_result = :analysis_result,
                updated_at = :updated_at
        """,
        ExpressionAttributeValues={
            ":analysis_result": analysis_result,
            ":updated_at": updated_at
        }
    )


def save_document_summary(
    doc_id: str,
    user_id: str,
    document_type: str,
    summary: str,
    updated_at: str
) -> None:
    """
    Save document_type and summary fields separately for easier access.
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="""
            SET document_type = :document_type,
                summary = :summary,
                updated_at = :updated_at
        """,
        ExpressionAttributeValues={
            ":document_type": document_type,
            ":summary": summary,
            ":updated_at": updated_at
        }
    )


def save_document_error(
    doc_id: str,
    user_id: str,
    error_message: str,
    updated_at: str
) -> None:
    """
    Save error message when processing fails.
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="""
            SET error_message = :error_message,
                updated_at = :updated_at
        """,
        ExpressionAttributeValues={
            ":error_message": error_message,
            ":updated_at": updated_at
        }
    )


def update_document_after_ocr(
    doc_id: str,
    user_id: str,
    raw_text: str,
    status: str,
    updated_at: str
) -> None:
    """
    Save OCR text and update status together.
    Example status: ocr_done
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="""
            SET raw_text = :raw_text,
                #status = :status,
                updated_at = :updated_at
        """,
        ExpressionAttributeNames={
            "#status": "status"
        },
        ExpressionAttributeValues={
            ":raw_text": raw_text,
            ":status": status,
            ":updated_at": updated_at
        }
    )


def update_document_after_analysis(
    doc_id: str,
    user_id: str,
    document_type: str,
    summary: str,
    analysis_result: Dict[str, Any],
    status: str,
    updated_at: str
) -> None:
    """
    Save analysis result and update status together.
    Example status: done
    """
    documents_table.update_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        },
        UpdateExpression="""
            SET document_type = :document_type,
                summary = :summary,
                analysis_result = :analysis_result,
                #status = :status,
                updated_at = :updated_at
        """,
        ExpressionAttributeNames={
            "#status": "status"
        },
        ExpressionAttributeValues={
            ":document_type": document_type,
            ":summary": summary,
            ":analysis_result": analysis_result,
            ":status": status,
            ":updated_at": updated_at
        }
    )


# =========================
# Checklists table
# =========================
def create_checklist(item: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a checklist item.
    Required keys should include at least:
    - checklist_id
    """
    checklists_table.put_item(Item=item)
    return item


def create_checklists(items: List[Dict[str, Any]]) -> None:
    """
    Batch create checklist items.
    """
    if not items:
        return

    with checklists_table.batch_writer() as batch:
        for item in items:
            batch.put_item(Item=item)


def get_checklist(checklist_id: str) -> Optional[Dict[str, Any]]:
    """
    Get one checklist item by checklist_id.
    """
    response = checklists_table.get_item(
        Key={"checklist_id": checklist_id}
    )
    return response.get("Item")


def get_checklists_by_doc(doc_id: str) -> List[Dict[str, Any]]:
    """
    Get checklist items for a document using GSI: doc_id-index
    """
    response = checklists_table.query(
        IndexName="doc_id-index",
        KeyConditionExpression=Key("doc_id").eq(doc_id)
    )
    return response.get("Items", [])


def update_checklist_completed(
    checklist_id: str,
    completed: bool,
    updated_at: str
) -> None:
    """
    Update checklist item completed status.
    """
    checklists_table.update_item(
        Key={"checklist_id": checklist_id},
        UpdateExpression="""
            SET completed = :completed,
                updated_at = :updated_at
        """,
        ExpressionAttributeValues={
            ":completed": completed,
            ":updated_at": updated_at
        }
    )


def update_checklist_fields(
    checklist_id: str,
    name: str,
    description: str,
    completed: bool,
    due_date: Optional[str],
    updated_at: str
) -> None:
    """
    Update multiple checklist fields.
    """
    checklists_table.update_item(
        Key={"checklist_id": checklist_id},
        UpdateExpression="""
            SET #name = :name,
                description = :description,
                completed = :completed,
                due_date = :due_date,
                updated_at = :updated_at
        """,
        ExpressionAttributeNames={
            "#name": "name"
        },
        ExpressionAttributeValues={
            ":name": name,
            ":description": description,
            ":completed": completed,
            ":due_date": due_date,
            ":updated_at": updated_at
        }
    )


# =========================
# Generic delete helpers
# =========================
def delete_document(doc_id: str, user_id: str) -> None:
    """
    Delete a document item.
    """
    documents_table.delete_item(
        Key={
            "doc_id": doc_id,
            "user_id": user_id
        }
    )


def delete_checklist(checklist_id: str) -> None:
    """
    Delete a checklist item.
    """
    checklists_table.delete_item(
        Key={"checklist_id": checklist_id}
    )