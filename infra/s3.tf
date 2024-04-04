resource "aws_s3_bucket" "global_poker_academy" {
  bucket = local.bucket_name
}

resource "aws_s3_bucket_server_side_encryption_configuration" "global_poker_academy_encryption" {
  bucket = aws_s3_bucket.global_poker_academy.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "global_poker_academy_cors" {
  bucket = aws_s3_bucket.global_poker_academy.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_policy" "global_poker_academy" {
  bucket = aws_s3_bucket.global_poker_academy.bucket
  policy = jsonencode(
    {
      Version = "2012-10-17",
      Statement = [
        {
          "Sid" : "AllowSSLRequestsOnly",
          Action = "s3:*",
          Effect = "Deny",
          Resource = [
            aws_s3_bucket.global_poker_academy.arn,
            "${aws_s3_bucket.global_poker_academy.arn}/*",
          ],
          "Condition" : {
            "Bool" : {
              "aws:SecureTransport" : "false"
            }
          },
          "Principal" : "*",
        },
        {
         Action = "s3:GetObject"
         Effect = "Allow"
         Principal = {
           AWS = aws_cloudfront_origin_access_identity.origin.iam_arn
         }
         Resource = "${aws_s3_bucket.global_poker_academy.arn}/*"
         Sid      = "Grant a CloudFront Origin Identity private access to S3 Bucket content"
        }
      ]
    }
  )
}

resource "aws_s3_bucket_public_access_block" "global_poker_academy" {
  bucket                  = aws_s3_bucket.global_poker_academy.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
  depends_on = [
    aws_s3_bucket.global_poker_academy,
    aws_s3_bucket_policy.global_poker_academy
  ]
}