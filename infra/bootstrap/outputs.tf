output "state_bucket_name" {
  description = "Name of the Google Cloud Storage bucket used for Terraform state."
  value       = google_storage_bucket.terraform_state.name
}

output "state_bucket_url" {
  description = "Google Cloud Storage URL for the Terraform state bucket."
  value       = google_storage_bucket.terraform_state.url
}
