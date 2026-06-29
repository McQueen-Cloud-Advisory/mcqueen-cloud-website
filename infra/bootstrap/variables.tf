variable "project_id" {
  description = "Google Cloud project ID that will contain the Terraform state bucket."
  type        = string
}

variable "region" {
  description = "Google Cloud region used for regional infrastructure."
  type        = string
  default     = "us-east4"
}

variable "state_bucket_name" {
  description = "Globally unique name for the Google Cloud Storage bucket that will hold Terraform state."
  type        = string

  validation {
    condition     = length(var.state_bucket_name) >= 3 && length(var.state_bucket_name) <= 63
    error_message = "The state bucket name must contain between 3 and 63 characters."
  }
}
