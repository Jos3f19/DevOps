terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = "responsive-hall-419216"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

# Enables the Cloud Run API
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}

# Allow unauthenticated users to invoke the service
resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.run_service.name
  location = google_cloud_run_service.run_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Create the Cloud Run service
resource "google_cloud_run_service" "run_service" {
  name = "newdevops"
  location = "us-east5"

  template {
    spec {
      containers {
        image = "gcr.io/responsive-hall-419216/newdevops@sha256:716e8cc9a81642dcc3536826a61743ef8e7d22ac105338b9bb693857f0f6ab69"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Waits for the Cloud Run API to be enabled
  depends_on = [google_project_service.run_api]
}

# Display the service URL
output "service_url" {
  value = google_cloud_run_service.run_service.status[0].url
}