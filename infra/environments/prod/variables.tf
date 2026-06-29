variable "project_id" {
  description = "Google Cloud project ID for the production environment."
  type        = string
}

variable "region" {
  description = "Default Google Cloud region for production resources."
  type        = string
  default     = "us-east4"
}

variable "environment" {
  description = "Environment name used for labels and resource naming."
  type        = string
  default     = "prod"

  validation {
    condition     = var.environment == "prod"
    error_message = "The production root module must use the prod environment value."
  }
}
