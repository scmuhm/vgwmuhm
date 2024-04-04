resource "aws_route53_zone" "zone_pok_academy" {
  name = local.domain_name
}

resource "aws_route53_zone" "zone_pok_dot_academy" {
  name = local.alt_domain_name
}

resource "aws_route53_record" "nameserver_pok_academy" {
  allow_overwrite = true
  name            = local.domain_name
  ttl             = 300
  type            = "NS"
  zone_id         = aws_route53_zone.zone_pok_academy.zone_id

  records = aws_route53_zone.zone_pok_academy.name_servers
}

data "tfe_outputs" "pok_academy_dev" {
  count = var.environment == "mar-prod" ? 1 : 0

  organization = "vgw-growth"
  workspace    = "mar_site_pok_academy_dev"
}

data "tfe_outputs" "pok_academy_test" {
  count = var.environment == "mar-prod" ? 1 : 0

  organization = "vgw-growth"
  workspace    = "mar_site_pok_academy_test"
}

resource "aws_route53_record" "nameserver_pok_academy_dev" {
  count = var.environment == "mar-prod" ? 1 : 0

  allow_overwrite = true
  name            = "dev.${local.domain_name}"
  ttl             = 300
  type            = "NS"
  zone_id         = aws_route53_zone.zone_pok_academy.zone_id

  records = data.tfe_outputs.pok_academy_dev[0].values.route53_ns_records_pok_academy
}

resource "aws_route53_record" "nameserver_pok_academy_test" {
  count = var.environment == "mar-prod" ? 1 : 0

  allow_overwrite = true
  name            = "test.${local.domain_name}"
  ttl             = 300
  type            = "NS"
  zone_id         = aws_route53_zone.zone_pok_academy.zone_id

  records = data.tfe_outputs.pok_academy_test[0].values.route53_ns_records_pok_academy
}

resource "aws_route53_record" "nameserver_pok_dot_academy" {
  allow_overwrite = true
  name            = local.alt_domain_name
  ttl             = 300
  type            = "NS"
  zone_id         = aws_route53_zone.zone_pok_dot_academy.zone_id

  records = aws_route53_zone.zone_pok_dot_academy.name_servers
}

resource "aws_route53_record" "nameserver_pok_dot_academy_dev" {
  count = var.environment == "mar-prod" ? 1 : 0

  allow_overwrite = true
  name            = "dev.${local.alt_domain_name}"
  ttl             = 300
  type            = "NS"
  zone_id         = aws_route53_zone.zone_pok_dot_academy.zone_id

  records = data.tfe_outputs.pok_academy_dev[0].values.route53_ns_records_pok_dot_academy
}

resource "aws_route53_record" "nameserver_pok_dot_academy_test" {
  count = var.environment == "mar-prod" ? 1 : 0

  allow_overwrite = true
  name            = "test.${local.alt_domain_name}"
  ttl             = 300
  type            = "NS"
  zone_id         = aws_route53_zone.zone_pok_dot_academy.zone_id

  records = data.tfe_outputs.pok_academy_test[0].values.route53_ns_records_pok_dot_academy
}

resource "aws_route53_record" "www_pok_academy" {
  for_each = toset([
    local.www_domain_name,
    local.domain_name,
  ])

  zone_id = aws_route53_zone.zone_pok_academy.zone_id
  name    = each.value
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.pok_academy_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.pok_academy_cdn.hosted_zone_id
  }
}

resource "aws_route53_record" "www_pok_dot_academy" {
  for_each = toset([
    local.alt_domain_name,
    local.www_alt_domain_name,
  ])

  zone_id = aws_route53_zone.zone_pok_dot_academy.zone_id
  name    = each.value
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.pok_academy_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.pok_academy_cdn.hosted_zone_id
  }
}

resource "aws_route53_record" "pok_academy_email_records" {
  count = var.environment == "mar-prod" ? 1 : 0

  zone_id = aws_route53_zone.zone_pok_academy.zone_id
  name    = local.domain_name
  type    = "MX"
  ttl     = 300
  records = [
    "10 ALT4.ASPMX.L.GOOGLE.COM",
    "1 ASPMX.L.GOOGLE.COM",
    "10 ALT3.ASPMX.L.GOOGLE.COM",
    "5 ALT1.ASPMX.L.GOOGLE.COM",
    "5 ALT2.ASPMX.L.GOOGLE.COM",
  ]
}

resource "aws_route53_record" "pok_academy_email_verification_record" {
  count = var.environment == "mar-prod" ? 1 : 0

  name    = local.domain_name
  type    = "TXT"
  zone_id = aws_route53_zone.zone_pok_academy.zone_id
  ttl     = 300
  records = ["google-site-verification=DOW-y9k2Q6-yGGIkJyfzCkE2nG-HfObW1o8TG9d9B5A"]
}

resource "aws_route53_record" "cert_validation_pok_academy" {
  for_each = {
    for dvo in aws_acm_certificate.pok_academy.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id         = endswith(each.key, local.domain_name) ? aws_route53_zone.zone_pok_academy.zone_id : aws_route53_zone.zone_pok_dot_academy.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate" "pok_academy" {
  provider                  = aws.global
  domain_name               = local.domain_name
  validation_method         = "DNS"
  subject_alternative_names = [
    local.www_domain_name,
    local.alt_domain_name,
    local.www_alt_domain_name,
  ]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "pok_academy" {
  provider                = aws.global
  certificate_arn         = aws_acm_certificate.pok_academy.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation_pok_academy : record.fqdn]
}

output "route53_ns_records_pok_academy" {
  value = aws_route53_record.nameserver_pok_academy.records
}

output "route53_ns_records_pok_dot_academy" {
  value = aws_route53_record.nameserver_pok_dot_academy.records
}
