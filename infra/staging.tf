# Temporary resources created for MP-2419, epic MP-2488
# Staging environment for Sitecore CMS pre-cutover

resource "aws_s3_bucket" "global_poker_academy_staging" {
  count = var.environment == "mar-prod" ? 1 : 0

  bucket = "staging-prod.globalpokeracademy.com"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "global_poker_academy_encryption_staging" {
  count = var.environment == "mar-prod" ? 1 : 0

  bucket = aws_s3_bucket.global_poker_academy_staging[0].id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "global_poker_academy_staging_cors" {
  count = var.environment == "mar-prod" ? 1 : 0

  bucket = aws_s3_bucket.global_poker_academy_staging[0].id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_policy" "global_poker_academy_staging" {
  count = var.environment == "mar-prod" ? 1 : 0

  bucket = aws_s3_bucket.global_poker_academy_staging[0].bucket
  policy = jsonencode(
    {
      Version = "2012-10-17",
      Statement = [
        {
          "Sid" : "AllowSSLRequestsOnly",
          Action = "s3:*",
          Effect = "Deny",
          Resource = [
            aws_s3_bucket.global_poker_academy_staging[0].arn,
            "${aws_s3_bucket.global_poker_academy_staging[0].arn}/*",
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
            AWS = aws_cloudfront_origin_access_identity.origin_staging[0].iam_arn
          }
          Resource = "${aws_s3_bucket.global_poker_academy_staging[0].arn}/*"
          Sid      = "Grant a CloudFront Origin Identity private access to S3 Bucket content"
        }
      ]
    }
  )
}

resource "aws_s3_bucket_public_access_block" "global_poker_academy_staging" {
  count = var.environment == "mar-prod" ? 1 : 0

  bucket                  = aws_s3_bucket.global_poker_academy_staging[0].id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
  depends_on = [
    aws_s3_bucket.global_poker_academy_staging[0],
    aws_s3_bucket_policy.global_poker_academy_staging[0]
  ]
}

resource "aws_cloudfront_origin_access_identity" "origin_staging" {
  count = var.environment == "mar-prod" ? 1 : 0

  comment = "Origin access identity for the temp Staging environment for the Global Poker Academy Landing site."
}

resource "aws_cloudfront_distribution" "pok_academy_cdn_staging" {
  count = var.environment == "mar-prod" ? 1 : 0

  enabled             = true
  comment             = "CDN for the Global Poker Academy Staging landing site."
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  is_ipv6_enabled     = true

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404/index.html"
  }

  origin {
    domain_name = aws_s3_bucket.global_poker_academy_staging[0].bucket_domain_name
    origin_id   = "content-bucket"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_staging[0].cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    default_ttl            = 300
    max_ttl                = 600
    min_ttl                = 0
    smooth_streaming       = false
    target_origin_id       = "content-bucket"
    trusted_signers        = []
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false

      headers = [
        "CloudFront-Viewer-Country",
        "Cloudfront-Viewer-Country-Region",
      ]

      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.gp_url_rewrite[0].arn
    }
  }

  logging_config {
    bucket = data.aws_s3_bucket.cloudfront_logs_bucket.bucket_domain_name
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  web_acl_id = data.aws_wafv2_web_acl.martech_default_waf.arn
}

resource "aws_cloudfront_function" "gp_url_rewrite" {
  count = var.environment == "mar-prod" ? 1 : 0
  comment = "Url rewrite function required for GP staging env only - adds 'index.html' to uri"

  name    = "gp-url-rewrite"
  runtime = "cloudfront-js-1.0"
  publish = true
  code    = file("${path.module}/functions/gp-url-rewrite.js")

  lifecycle {
    create_before_destroy = true
  }
}
