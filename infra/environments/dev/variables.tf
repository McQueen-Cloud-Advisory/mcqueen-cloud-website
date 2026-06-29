variable "project_id" {
  description = "Google Cloud project ID for the development environment."
  type        = string
}

variable "region" {
  description = "Default Google Cloud region for development resources."
  type        = string
  default     = "us-east4"
}

variable "environment" {
  description = "Environment name used for labels and resource naming."
  type        = string
  default     = "dev"

  validation {
    condition     = var.environment == "dev"
    error_message = "The development root module must use the dev environment value."
  }
}
