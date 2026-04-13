# backend/common/textract.py

import os

import boto3

S3_BUCKET = os.environ.get("S3_BUCKET", "littleboss-uploads")

textract_client = boto3.client("textract")


def extract_text_from_s3(s3_key: str) -> str:
    response = textract_client.detect_document_text(
        Document={
            "S3Object": {
                "Bucket": S3_BUCKET,
                "Name": s3_key,
            }
        }
    )
    lines = []
    for block in response.get("Blocks", []):
        if block["BlockType"] == "LINE":
            lines.append(block["Text"])
    return "\n".join(lines)


def extract_text_from_bytes(file_bytes: bytes) -> str:
    response = textract_client.detect_document_text(
        Document={"Bytes": file_bytes}
    )
    lines = []
    for block in response.get("Blocks", []):
        if block["BlockType"] == "LINE":
            lines.append(block["Text"])
    return "\n".join(lines)
