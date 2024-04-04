data "aws_s3_bucket" "cloudfront_logs_bucket" {
  bucket   = "${var.environment == "mar-test" ? "mar-dev" : var.environment}-cloudfront-${data.aws_caller_identity.current.account_id}"
  provider = aws.global
}

resource "aws_cloudfront_origin_access_identity" "origin" {
  comment = "Origin access identity for the ${var.environment} Global Poker Academy Landing site."
}

resource "aws_cloudfront_distribution" "pok_academy_cdn" {
  enabled             = true
  aliases             = [
    local.domain_name,
    local.www_domain_name,
    local.alt_domain_name,
    local.www_alt_domain_name,
  ]
  comment             = "CDN for the Global Poker Academy landing site."
  default_root_object = "index.html"
  price_class         = "PriceClass_All"
  is_ipv6_enabled     = true

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
  }

  origin {
    domain_name = aws_s3_bucket.global_poker_academy.bucket_domain_name
    origin_id   = "content-bucket"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin.cloudfront_access_identity_path
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
      function_arn = aws_cloudfront_function.url_rewrite.arn
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
    acm_certificate_arn      = aws_acm_certificate_validation.pok_academy.certificate_arn
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method       = "sni-only"
  }

  web_acl_id = data.aws_wafv2_web_acl.martech_default_waf.arn
}

resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.environment}-url-rewrite-global-poker-academy"
  runtime = "cloudfront-js-1.0"
  publish = true
  code    = file("${path.module}/functions/url-rewrite.js")
  lifecycle {
    create_before_destroy = true
  }
}

data "aws_wafv2_web_acl" "martech_default_waf" {
  provider = aws.global
  name     = "${var.environment == "mar-test" ? "mar-dev" : var.environment}-wafv2-acl"
  scope    = "CLOUDFRONT"
}
