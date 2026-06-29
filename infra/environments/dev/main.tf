locals {
  common_labels = {
    environment = var.environment
    managed_by  = "terraform"
    application = "mcqueen-cloud-website"
  }
}
