# Terraform Bootstrap

This directory will contain the one-time configuration used to create the remote Terraform state bucket and its protections.

Bootstrap infrastructure is separate because the state backend must exist before the primary environment configurations can use it.
