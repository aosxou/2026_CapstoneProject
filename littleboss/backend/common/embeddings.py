# backend/common/embeddings.py

import math
from typing import List

import google.generativeai as genai

EMBEDDING_MODEL = "models/text-embedding-004"


def generate_embedding(text: str) -> List[float]:
    """
    Generate an embedding vector from text using Gemini Embedding API.
    """
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=text,
        task_type="RETRIEVAL_DOCUMENT",
    )
    return result["embedding"]


def generate_query_embedding(query: str) -> List[float]:
    """
    Generate an embedding vector from a search query.
    """
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=query,
        task_type="RETRIEVAL_QUERY",
    )
    return result["embedding"]


def cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    """
    Compute cosine similarity between two vectors.
    """
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)
