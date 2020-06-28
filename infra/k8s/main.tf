/**
 * Kubernetes infrastructure for the GraphQL React Prototype.
 * Author: Andrew Jarombek
 * Date: 6/28/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.12"

  required_providers {
    aws = ">= 2.66.0"
  }

  backend "s3" {
    bucket = "andrew-jarombek-terraform-state"
    encrypt = true
    key = "sandbox/graphql-react-prototype/k8s"
    region = "us-east-1"
  }
}
