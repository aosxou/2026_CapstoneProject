# backend/common/constants.py

# Document processing status
DOCUMENT_STATUS = {
    "UPLOADED": "uploaded",
    "OCR_DONE": "ocr_done",
    "DONE": "done",
    "ERROR": "error",
}

# Calendar event status
CALENDAR_STATUS = {
    "CREATED": "created",
    "FAILED": "failed",
}

# Checklist item default
CHECKLIST_DEFAULT_COMPLETED = False

# Deadline urgency levels
URGENCY_LEVEL = {
    "HIGH": "high",
    "NORMAL": "normal",
    "LOW": "low",
}

# Default values
DEFAULT_EVENT_TIME = "23:59"
DEFAULT_TIMEZONE = "Asia/Seoul"

# Supported mime types
SUPPORTED_MIME_TYPES = {
    "PDF": "application/pdf",
    "PNG": "image/png",
    "JPEG": "image/jpeg",
    "JPG": "image/jpg",
}

# S3 folder paths
S3_FOLDERS = {
    "UPLOADS": "uploads/",
    "OCR_RESULTS": "ocr-results/",
    "ANALYSIS_RESULTS": "analysis-results/",
}

# API messages
MESSAGE = {
    "HEALTH_OK": "LittleBoss backend is running.",
    "DOCUMENT_CREATED": "Document record created successfully.",
    "DOCUMENT_NOT_FOUND": "Document not found.",
    "CHECKLIST_NOT_FOUND": "Checklist not found.",
    "INVALID_REQUEST": "Invalid request.",
    "INTERNAL_ERROR": "Internal server error.",
}