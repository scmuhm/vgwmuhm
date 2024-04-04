resource "aws_secretsmanager_secret" "sitecore_organization_credentials" {
  name        = "${var.environment}/application/external/sitecore/ORGANIZATION_CREDENTIALS"
  description = "Sitecore organisation credentials: CLIENT_ID and CLIENT_SECRETS, used to execute deployment commands across all Sitecore environments in our Github workflows"
}

resource "aws_secretsmanager_secret" "sitecore_environment_credentials" {
  name        = "${var.environment}/application/external/sitecore/ENVIRONMENT_CREDENTIALS"
  description = "Sitecore Environment specific credentials: CLIENT_ID and CLIENT_SECRETS, used to create Sitecore webhooks"
}

resource "aws_secretsmanager_secret" "github_service_user_personal_access_token" {
  name        = "${var.environment}/application/external/sitecore/GITHUB_WEBHOOK_SERVICE_USER_PERSONAL_ACCESS_TOKEN"
  description = "Github service user Github Personal Access Token generated in mar-sitecore repo to create webhooks between Sitecore and Github"
}

resource "aws_secretsmanager_secret" "sitecore_website_export_api_key" {
  name        = "${var.environment}/application/external/sitecore/WEBSITE_EXPORT_API_KEY"
  description = "API Key used to build a static version of the website from our github actions ci cd pipelines"
}

moved {
  from = aws_secretsmanager_secret.Sitecore_environment_credentials
  to = aws_secretsmanager_secret.sitecore_environment_credentials
}
