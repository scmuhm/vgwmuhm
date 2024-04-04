terraform {
  required_version = "= 1.3.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.38.0"
    }
  }

  cloud {
    organization = "vgw-growth"
    hostname     = "app.terraform.io"
  }
}

provider "aws" {
  region = "eu-west-1"

  default_tags {
    tags = local.tags
  }
}

provider "aws" {
  alias  = "global"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}

data "aws_caller_identity" "current" {}

locals {
  env_config = {
    mar-dev = {
      domain_prefix = "dev."
      bucket_name = "dev.globalpokeracademy.com"
    }
    mar-test = {
      domain_prefix = "test."
      bucket_name = "test.globalpokeracademy.com"
    }
    mar-prod = {
      domain_prefix = ""
      bucket_name = "globalpokeracademy.com"
    }
  }

  domain_prefix       = local.env_config[var.environment].domain_prefix

  domain_name         = "${local.domain_prefix}globalpokeracademy.com"
  www_domain_name     = "www.${local.domain_prefix}globalpokeracademy.com"
  alt_domain_name     = "${local.domain_prefix}globalpoker.academy"
  www_alt_domain_name = "www.${local.domain_prefix}globalpoker.academy"

  bucket_name = local.env_config[var.environment].bucket_name

  tags = {
    "vgw:environment"         = var.environment
    "vgw:data-classification" = "sensitive"
    "vgw:deploy:tool"         = "terraform"
    "vgw:deploy:repository"   = "https://github.com/VGW/mar-sitecore"
    "vgw:cost-center"         = "mar"
    "vgw:owner"               = "mar"
    "vgw:department"          = "technology"
  }
}

