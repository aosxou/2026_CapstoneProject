# backend/action-executor/index.py

import traceback

from common.response import success_response, error_response, options_response
from common.utils import parse_body
from common.constants import MESSAGE
from service import create_calendar_events


def lambda_handler(event, context):
    method = event.get("httpMethod", "")

    if method == "OPTIONS":
        return options_response()

    if method != "POST":
        return error_response("Method not allowed", 405)

    try:
        body = parse_body(event)
        user_id = body.get("user_id")
        doc_id = body.get("doc_id")

        if not user_id or not doc_id:
            return error_response("user_id and doc_id are required", 400)

        created = create_calendar_events(user_id, doc_id)
        return success_response(
            data={"events_created": len(created), "events": created},
            message=f"{len(created)} calendar events created",
        )

    except ValueError as e:
        return error_response(str(e), 400)
    except Exception:
        traceback.print_exc()
        return error_response(MESSAGE["INTERNAL_ERROR"], 500)
