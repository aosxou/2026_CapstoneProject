# backend/vector-search/service.py

from decimal import Decimal
from typing import List, Dict, Any

from common.db import get_all_embeddings_by_user
from common.embeddings import generate_query_embedding, cosine_similarity


def search_similar_documents(
    user_id: str,
    query: str,
    top_k: int = 5,
) -> List[Dict[str, Any]]:
    """
    Search for similar documents by computing cosine similarity
    between a query embedding and stored document embeddings.
    """
    query_embedding = generate_query_embedding(query)

    all_embeddings = get_all_embeddings_by_user(user_id)
    if not all_embeddings:
        return []

    results = []
    for item in all_embeddings:
        stored_embedding = [float(v) for v in item.get("embedding", [])]
        if not stored_embedding:
            continue

        score = cosine_similarity(query_embedding, stored_embedding)
        results.append({
            "doc_id": item.get("doc_id"),
            "document_type": item.get("document_type", ""),
            "summary": item.get("summary", ""),
            "similarity": round(score, 4),
        })

    results.sort(key=lambda x: x["similarity"], reverse=True)
    return results[:top_k]
