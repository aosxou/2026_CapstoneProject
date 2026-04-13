# backend/upload-handler/index.py

import json
import traceback

from common.response import success_response, error_response, options_response
from common.utils import parse_body
from common.constants import MESSAGE
from service import handle_upload


def lambda_handler(event, context):
    method = event.get("httpMethod", "")

    if method == "OPTIONS":
        return options_response()

    if method != "POST":
        return error_response("Method not allowed", 405)

    try:
        body = parse_body(event)
        result = handle_upload(body)
        return success_response(
            data=result,
            message=MESSAGE["DOCUMENT_CREATED"],
            status_code=201,
        )
    except ValueError as e:
        return error_response(str(e), 400)
    except Exception:
        traceback.print_exc()
        return error_response(MESSAGE["INTERNAL_ERROR"], 500)
