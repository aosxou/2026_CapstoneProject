# backend/action-executor/service.py

import os
from typing import Dict, Any, List

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from common.db import get_document, get_user, update_user_tokens
from common.constants import DEFAULT_TIMEZONE
from common.utils import now_iso

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "")


def _get_calendar_service(user: dict):
    creds = Credentials(
        token=user.get("calendar_access_token", ""),
        refresh_token=user.get("calendar_refresh_token", ""),
        token_uri="https://oauth2.googleapis.com/token",
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
    )
    return build("calendar", "v3", credentials=creds)


def create_calendar_events(
    user_id: str, doc_id: str
) -> List[Dict[str, Any]]:
    user = get_user(user_id)
    if not user:
        raise ValueError("User not found")

    if not user.get("calendar_access_token"):
        raise ValueError("Google Calendar not connected")

    doc = get_document(doc_id, user_id)
    if not doc:
        raise ValueError("Document not found")

    analysis = doc.get("analysis_result", {})
    events = analysis.get("calendar_events", [])
    if not events:
        return []

    service = _get_calendar_service(user)
    created = []

    for ev in events:
        event_body = {
            "summary": ev.get("title", "LittleBoss 일정"),
            "description": ev.get("description", ""),
            "start": {
                "dateTime": f"{ev['date']}T{ev.get('time', '23:59')}:00",
                "timeZone": DEFAULT_TIMEZONE,
            },
            "end": {
                "dateTime": f"{ev['date']}T{ev.get('time', '23:59')}:00",
                "timeZone": DEFAULT_TIMEZONE,
            },
            "reminders": {
                "useDefault": False,
                "overrides": [
                    {"method": "popup", "minutes": 5 * 24 * 60},  # D-5
                    {"method": "popup", "minutes": 3 * 24 * 60},  # D-3
                    {"method": "popup", "minutes": 1 * 24 * 60},  # D-1
                ],
            },
        }

        result = service.events().insert(
            calendarId="primary", body=event_body
        ).execute()

        created.append({
            "google_event_id": result.get("id"),
            "title": ev.get("title"),
            "date": ev.get("date"),
            "status": "created",
        })

    return created
