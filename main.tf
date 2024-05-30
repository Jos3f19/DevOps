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
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/responsive-hall-419216/devopsudem@sha256:579a0b4f222db95d9340fc5a9deef1eccaf9c4cbcdfc93f11d1da48ed94ed993"
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