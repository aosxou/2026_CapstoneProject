# backend/vector-search/index.py

import json
import traceback

from common.response import success_response, error_response, options_response
from common.utils import parse_body
from common.constants import MESSAGE
from service import search_similar_documents


def lambda_handler(event, context):
    method = event.get("httpMethod", "")

    if method == "OPTIONS":
        return options_response()

    if method != "POST":
        return error_response("Method not allowed", 405)

    try:
        body = parse_body(event)

        user_id = body.get("user_id")
        query = body.get("query")
        top_k = body.get("top_k", 5)

        if not user_id or not query:
            return error_response(MESSAGE["INVALID_REQUEST"], 400)

        results = search_similar_documents(
            user_id=user_id,
            query=query,
            top_k=int(top_k),
        )

        return success_response(data={"results": results})

    except ValueError as e:
        return error_response(str(e), 400)
    except Exception:
        traceback.print_exc()
        return error_response(MESSAGE["INTERNAL_ERROR"], 500)
