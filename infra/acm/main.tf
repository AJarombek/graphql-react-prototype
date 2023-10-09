/**
 * Infrastructure for the ACM certificate used by the GraphQL React Prototype.
 * Author: Andrew Jarombek
 * Date: 7/3/2021
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.15.0"

  required_providers {
    aws = ">= 3.48.0"
  }

  backend "s3" {
    bucket  = "andrew-jarombek-terraform-state"
    encrypt = true
    key     = "sandbox/graphql-react-prototype/acm"
    region  = "us-east-1"
  }
}

#-------------------------------------------------------------
# New ACM Resource that Protects '*.graphql.proto.jarombek.com'
#-------------------------------------------------------------

module "jarombek-graphql-proto-acm-certificate" {
  source = "github.com/ajarombek/cloud-modules//terraform-modules/acm-certificate?ref=v0.2.12"

  # Mandatory arguments
  name            = "jarombek-graphql-proto-acm-certificate"
  tag_name        = "jarombek-graphql-proto-acm-certificate"
  tag_application = "jarombek-com"
  tag_environment = "production"

  route53_zone_name = "jarombek.com."
  acm_domain_name   = "*.graphql.proto.jarombek.com"

  # Optional arguments
  route53_zone_private = false
}