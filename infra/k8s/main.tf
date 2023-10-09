/**
 * Kubernetes infrastructure for the GraphQL React Prototype.
 * Author: Andrew Jarombek
 * Date: 6/28/2020
 */

provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 0.15.0"

  required_providers {
    aws        = ">= 3.48.0"
    kubernetes = ">= 2.3.2"
  }

  backend "s3" {
    bucket  = "andrew-jarombek-terraform-state"
    encrypt = true
    key     = "sandbox/graphql-react-prototype/k8s"
    region  = "us-east-1"
  }
}

data "aws_caller_identity" "current" {}

data "aws_eks_cluster" "cluster" {
  name = "andrew-jarombek-eks-cluster"
}

data "aws_vpc" "application-vpc" {
  tags = {
    Name = "application-vpc"
  }
}

data "aws_subnet" "kubernetes-dotty-public-subnet" {
  tags = {
    Name = "kubernetes-dotty-public-subnet"
  }
}

data "aws_subnet" "kubernetes-grandmas-blanket-public-subnet" {
  tags = {
    Name = "kubernetes-grandmas-blanket-public-subnet"
  }
}

data "aws_acm_certificate" "proto-jarombek-com-wildcard-cert" {
  domain   = "*.proto.jarombek.com"
  statuses = ["ISSUED"]
}

data "aws_acm_certificate" "graphql-proto-jarombek-com-wildcard-cert" {
  domain   = "*.graphql.proto.jarombek.com"
  statuses = ["ISSUED"]
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)

  exec {
    api_version = "client.authentication.k8s.io/v1alpha1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.cluster.name]
  }
}

locals {
  short_version     = "1.0.0"
  version           = "v${local.short_version}"
  account_id        = data.aws_caller_identity.current.account_id
  subnet1           = data.aws_subnet.kubernetes-dotty-public-subnet.id
  subnet2           = data.aws_subnet.kubernetes-grandmas-blanket-public-subnet.id
  cert_arn          = data.aws_acm_certificate.proto-jarombek-com-wildcard-cert.arn
  wildcard_cert_arn = data.aws_acm_certificate.graphql-proto-jarombek-com-wildcard-cert.arn
  certificates      = "${local.cert_arn},${local.wildcard_cert_arn}"
  host1             = "graphql.proto.jarombek.com"
  host2             = "www.graphql.proto.jarombek.com"
}

#--------------
# AWS Resources
#--------------

resource "aws_security_group" "graphql-react-prototype-lb-sg" {
  name   = "graphql-react-prototype-lb-security-group"
  vpc_id = data.aws_vpc.application-vpc.id

  lifecycle {
    create_before_destroy = true
  }

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "graphql-react-prototype-lb-security-group"
    Application = "graphql-react-prototype"
    Environment = "sandbox"
  }
}

#---------------------
# Kubernetes Resources
#---------------------

resource "kubernetes_service" "graphql-react-prototype" {
  metadata {
    name      = "graphql-react-prototype-service"
    namespace = "sandbox"

    labels = {
      version     = local.version
      environment = "sandbox"
      application = "graphql-react-prototype"
    }
  }

  spec {
    type = "NodePort"

    port {
      port        = 80
      target_port = 8080
      protocol    = "TCP"
    }

    selector = {
      application = "graphql-react-prototype"
    }
  }
}

resource "kubernetes_deployment" "graphql-react-prototype" {
  metadata {
    name      = "graphql-react-prototype"
    namespace = "sandbox"

    labels = {
      version     = local.version
      environment = "sandbox"
      application = "graphql-react-prototype"
    }
  }

  spec {
    replicas          = 1
    min_ready_seconds = 10

    strategy {
      type = "RollingUpdate"

      rolling_update {
        max_surge       = "1"
        max_unavailable = "0"
      }
    }

    selector {
      match_labels = {
        application = "graphql-react-prototype"
        environment = "sandbox"
      }
    }

    template {
      metadata {
        labels = {
          version     = local.version
          environment = "sandbox"
          application = "graphql-react-prototype"
        }
      }

      spec {
        affinity {
          node_affinity {
            required_during_scheduling_ignored_during_execution {
              node_selector_term {
                match_expressions {
                  key      = "workload"
                  operator = "In"
                  values   = ["development-tests"]
                }
              }
            }
          }
        }

        container {
          name  = "graphql-react-prototype"
          image = "${local.account_id}.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-app:${local.short_version}"

          readiness_probe {
            period_seconds        = 5
            initial_delay_seconds = 20

            http_get {
              path = "/"
              port = 8080
            }
          }

          liveness_probe {
            period_seconds        = 5
            initial_delay_seconds = 20
            failure_threshold     = 4

            http_get {
              path = "/"
              port = 8080
            }
          }

          port {
            container_port = 8080
            protocol       = "TCP"
          }
        }
      }
    }
  }
}

resource "kubernetes_ingress" "graphql-react-prototype" {
  metadata {
    name      = "graphql-react-prototype-ingress"
    namespace = "sandbox"

    annotations = {
      "kubernetes.io/ingress.class"                    = "alb"
      "external-dns.alpha.kubernetes.io/hostname"      = "${local.host1},${local.host2}"
      "alb.ingress.kubernetes.io/actions.ssl-redirect" = "{\"Type\": \"redirect\", \"RedirectConfig\": {\"Protocol\": \"HTTPS\", \"Port\": \"443\", \"StatusCode\": \"HTTP_301\"}}"
      "alb.ingress.kubernetes.io/backend-protocol"     = "HTTP"
      "alb.ingress.kubernetes.io/certificate-arn"      = local.certificates
      "alb.ingress.kubernetes.io/healthcheck-path"     = "/"
      "alb.ingress.kubernetes.io/listen-ports"         = "[{\"HTTP\":80}, {\"HTTPS\":443}]"
      "alb.ingress.kubernetes.io/healthcheck-protocol" : "HTTP"
      "alb.ingress.kubernetes.io/scheme"          = "internet-facing"
      "alb.ingress.kubernetes.io/security-groups" = aws_security_group.graphql-react-prototype-lb-sg.id
      "alb.ingress.kubernetes.io/subnets"         = "${local.subnet1},${local.subnet2}"
      "alb.ingress.kubernetes.io/target-type"     = "instance"
      "alb.ingress.kubernetes.io/tags"            = "Name=graphql-react-prototype-load-balancer,Application=graphql-react-prototype,Environment=sandbox"
    }

    labels = {
      version     = local.version
      environment = "sandbox"
      application = "graphql-react-prototype"
    }
  }

  spec {
    rule {
      host = local.host1

      http {
        path {
          path = "/*"

          backend {
            service_name = "ssl-redirect"
            service_port = "use-annotation"
          }
        }

        path {
          path = "/*"

          backend {
            service_name = "graphql-react-prototype-service"
            service_port = 80
          }
        }
      }
    }

    rule {
      host = local.host2

      http {
        path {
          path = "/*"

          backend {
            service_name = "ssl-redirect"
            service_port = "use-annotation"
          }
        }

        path {
          path = "/*"

          backend {
            service_name = "graphql-react-prototype-service"
            service_port = 80
          }
        }
      }
    }
  }
}
