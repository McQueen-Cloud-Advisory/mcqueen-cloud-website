$infraReadme = @'
# Infrastructure as Code

This directory contains the Terraform foundation for Google Cloud resources that support McQueen Cloud Advisory applications and future managed workloads.

## Purpose

The infrastructure code is intended to demonstrate and enforce:

- Declarative Google Cloud provisioning
- Environment separation
- Remote and protected Terraform state
- Least-privilege identity and access management
- Keyless GitHub authentication
- Cost-conscious architecture
- Controlled infrastructure changes
- Clear ownership boundaries between Terraform, Firebase, and manual configuration

## Infrastructure boundaries

### Terraform-managed

The planned Terraform scope includes:

- Required Google Cloud APIs
- Terraform state storage
- Deployment and runtime service accounts
- IAM bindings
- Workload Identity Federation for GitHub Actions
- Secret Manager containers and access policies
- Budget notifications and supported cost controls
- Monitoring and alerting resources
- Future Cloud Run, Artifact Registry, Pub/Sub, storage, database, or analytics resources when required by a real workload

### Firebase-managed

Firebase App Hosting currently manages:

- Website build and runtime infrastructure
- Application rollouts from the `main` branch
- Framework integration for the Next.js application
- Managed TLS lifecycle for the hosted application

Terraform will not recreate Firebase-managed runtime infrastructure merely to increase the amount of IaC in the repository.

### Manually configured but documented

Some resources or controls may remain manual because they sit outside the appropriate Terraform boundary or require an initial bootstrap step:

- Squarespace DNS records
- GitHub repository rules and branch protection
- Initial Google Cloud billing-account association
- Initial authentication used to create the Terraform state backend
- Firebase App Hosting repository connection

## Directory structure

```text
infra/
├── bootstrap/
├── environments/
│   ├── dev/
│   └── prod/
├── modules/
│   ├── cost-controls/
│   ├── identity/
│   ├── observability/
│   ├── project-services/
│   └── secrets/
├── README.md
└── versions.tf
