/**
 * Infrastructure for ECR repositories used by the GraphQL React Prototype.
 * Author: Andrew Jarombek
 * Date: 6/28/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.15"

  required_providers {
    aws = ">= 3.48.0"
  }

  backend "s3" {
    bucket  = "andrew-jarombek-terraform-state"
    encrypt = true
    key     = "sandbox/graphql-react-prototype/ecr"
    region  = "us-east-1"
  }
}

resource "aws_ecr_repository" "base" {
  name                 = "graphql-react-prototype-base"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "graphql-react-prototype-base-repository"
    Application = "graphql-react-prototype"
    Environment = "sandbox"
  }
}

resource "aws_ecr_repository" "app" {
  name                 = "graphql-react-prototype-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "graphql-react-prototype-app-repository"
    Application = "graphql-react-prototype"
    Environment = "sandbox"
  }
}
