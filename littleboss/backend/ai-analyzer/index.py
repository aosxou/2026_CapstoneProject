# backend/ai-analyzer/index.py

import traceback

from common.response import success_response, error_response, options_response
from common.utils import parse_body
from common.constants import MESSAGE
from service import handle_analysis


def lambda_handler(event, context):
    method = event.get("httpMethod", "")

    if method == "OPTIONS":
        return options_response()

    if method != "POST":
        return error_response("Method not allowed", 405)

    try:
        body = parse_body(event)
        doc_id = body.get("doc_id")
        user_id = body.get("user_id")

        if not doc_id or not user_id:
            return error_response("doc_id and user_id are required", 400)

        result = handle_analysis(doc_id, user_id)
        return success_response(data=result, message="Analysis completed")

    except ValueError as e:
        return error_response(str(e), 404)
    except RuntimeError as e:
        return error_response(str(e), 500)
    except Exception:
        traceback.print_exc()
        return error_response(MESSAGE["INTERNAL_ERROR"], 500)
