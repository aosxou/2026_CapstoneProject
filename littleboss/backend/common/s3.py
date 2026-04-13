# backend/common/s3.py

import os
import base64
from typing import Optional

import boto3

S3_BUCKET = os.environ.get("S3_BUCKET", "littleboss-uploads")

s3_client = boto3.client("s3")


def upload_file_base64(
    s3_key: str,
    file_content_base64: str,
    content_type: str = "application/octet-stream",
) -> str:
    file_bytes = base64.b64decode(file_content_base64)
    s3_client.put_object(
        Bucket=S3_BUCKET,
        Key=s3_key,
        Body=file_bytes,
        ContentType=content_type,
    )
    return s3_key


def get_file_bytes(s3_key: str) -> bytes:
    response = s3_client.get_object(Bucket=S3_BUCKET, Key=s3_key)
    return response["Body"].read()


def generate_presigned_url(
    s3_key: str, expiration: int = 3600
) -> str:
    return s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": S3_BUCKET, "Key": s3_key},
        ExpiresIn=expiration,
    )


def delete_file(s3_key: str) -> None:
    s3_client.delete_object(Bucket=S3_BUCKET, Key=s3_key)


def build_s3_key(user_id: str, doc_id: str, file_name: str) -> str:
    return f"uploads/{user_id}/{doc_id}/{file_name}"
