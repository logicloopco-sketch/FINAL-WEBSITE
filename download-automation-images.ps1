# Download 78 new automation og:images from growwstacks.com CDN
# Run from project root: powershell -ExecutionPolicy Bypass -File .\download-automation-images.ps1

$base = "https://ik.imagekit.io/r2zdlyze2o/GS-Website/N8N-Workflows"
$out  = Join-Path $PSScriptRoot "public\automations"

$images = @(
  "apollo-lead-ai|9034-automate-lead-generation-with-apollo-ai-parsing-and-tim.png",
  "ai-lead-nurture-ai|11284-automate-lead-nurturing-with-chatgpt-4o-and-gemini-for.png",
  "cold-email-tracker-ai|7710-tracking-cold-email-engagement-metrics-using-smartlead-.png",
  "erp-lead-manager-ai|2758-ai-driven-lead-management-and-inquiry-automation-with-e.png",
  "booking-assistant-ai|5387-automate-customer-support-and-calendar-bookings-with-op.png",
  "email-responder-ai|4807-smart-email-responder-workflow-using-ai.png",
  "reservation-ai|5454-automated-reservation-system-with-telegram-google-gemin.png",
  "form-reply-ai|5433-centralize-your-forms-and-reply-automatically-with-tall.png",
  "telegram-agent-ai|2751-telegram-messaging-agent-for-textaudioimages.png",
  "stripe-payment-notify-ai|13483-notify-customers-on-whatsapp-when-stripe-payment-succe.png",
  "order-fulfil-ai|3327-automatic-squarespace-order-fulfillment-process.png",
  "sales-report-ai|6358-pull-square-sales-summary-reports-for-automated-reporti.png",
  "revenue-spike-ai|12059-monitor-woocommerce-daily-revenue-spikes-and-send-slac.png",
  "stock-insight-ai|10615-real-time-stock-insights-using-xai.png",
  "ga-report-ai|2549-automate-google-analytics-reporting.png",
  "youtube-stats-ai|5766-extract-youtube-video-statistics-and-save-to-google-she.png",
  "seo-audit-ai|7463-seo-competitor-analysis-and-data-logging-with-semrush-a.png",
  "fb-ads-insight-ai|10427-analyze-facebook-ads-and-send-insights-to-google-sheet.png",
  "ga4-email-ai|8463-create-and-send-ga4-report-with-insights-via-email.png",
  "ga-airtable-ai|892-transfer-google-analytics-data-to-airtable-database.png",
  "tiktok-analytics-ai|6516-template-for-tiktok-rapidapi-and-google-sheets-services.png",
  "newsletter-brief-ai|9633-newsletter-summarization-and-briefing-with-gmail-ai-goo.png",
  "crunchbase-scout-ai|2076-scrape-crunchbase-recent-funding-rounds.png",
  "linkedin-to-hubspot-ai|1323-create-hubspot-contacts-from-linkedin-post-interactions.png",
  "airtable-hubspot-sync-ai|10866-workflow-for-two-way-sync-between-airtable-and-hubspot.png",
  "deal-distributor-ai|1225-export-new-deals-from-hubspot-to-slack-and-airtable.png",
  "contact-enrichment-ai|8969-hubspot-contact-ai-enrichment.png",
  "lead-router-gpt-ai|10102-dynamic-hubspot-lead-routing-with-gpt-4-and-airtable-s.png",
  "domain-enrich-ai|7623-enrich-domains-with-similarweb-traffic-analytics-in-goo.png",
  "typeform-lead-ai|8685-typeform-lead-capture-to-hubspot-with-scoring-and-slack.png",
  "linkedin-leads-ai|7034-convert-linkedin-post-reactions-into-qualified-leads-wi.png",
  "webhook-builder-ai|4544-create-dynamic-workflows-programmatically-via-webhooks-.png",
  "error-retry-ai|3144-auto-retry-engine-error-recovery-workflow.png",
  "drive-airtable-ai|2776-sync-new-files-from-google-drive-with-airtable.png",
  "zoom-archive-ai|8056-auto-save-zoom-recordings-to-google-drive-log-meetings-.png",
  "order-reward-ai|7400-automated-order-confirmations-with-abacate-pay-first-bu.png",
  "team-invite-ai|3233-automate-n8n-user-invitations-from-a-google-spreadsheet.png",
  "meeting-prep-ai|4505-automate-meeting-prep-and-lead-enrichment-with-bright-d.png",
  "social-visuals-ai|13357-generate-multi-format-social-visuals-with-abyssale-and.png",
  "festival-post-ai|5765-festival-social-media-automation-with-gemini-ai-for-xtw.png",
  "newsletter-gen-ai|10196-create-a-personalized-daily-newsletter-with-google-gem.png",
  "gmail-sort-ai|3772-automatically-classify-and-label-gmail-emails-with-goog.png",
  "blog-rss-ai|8363-generate-seo-optimized-blog-content-with-google-gemini-.png",
  "wp-blog-ai|10180-ai-blog-post-generator-with-scheduled-or-prompt-based-.png",
  "rss-social-ai|9208-automate-rss-to-social-media-with-ai-summaries-and-imag.png",
  "blogger-post-ai|6015-generate-and-publish-seo-blog-posts-to-blogger-using-op.png",
  "cold-icebreaker-ai|12837-generate-personalized-cold-email-icebreakers-from-link.png",
  "shopify-blog-ai|9115-generate-seoaeo-optimized-shopify-blog-articles-with-gp.png",
  "ticket-classify-ai|11854-ai-powered-ticket-triage-with-multi-model-classificati.png",
  "jira-from-email-ai|3893-automatically-create-jira-issues-from-outlook-email-sup.png",
  "zendesk-ticket-ai|496-create-a-ticket-in-zendesk.png",
  "hubspot-sla-ai|12940-triage-and-escalate-hubspot-tickets-to-jira-with-slack.png",
  "gemini-email-ai|8688-automate-email-management-with-gemini-ai-and-gmail-for-.png",
  "auto-responder-ai|3277-smart-email-auto-responder-template-using-ai.png",
  "feedback-router-ai|9782-ai-powered-customer-feedback-analysis-and-routing-for-g.png",
  "human-loop-ai|6082-human-in-the-loop-email-response-system-ai-imap.png",
  "gmail-alert-ai|7553-classify-gmail-emails-with-gpt-4o-mini-and-send-telegra.png",
  "email-memory-ai|7150-email-parser-for-rag-agent-powered-by-gmail-and-mem0.png",
  "cv-intake-ai|2579-handling-job-application-submissions-with-ai-and-n8n-fo.png",
  "resume-scorer-ai|3318-automated-resume-review-system-using-openai-google-shee.png",
  "job-hunter-ai|8487-find-perfect-jobs-and-generate-tailored-cover-letters-w.png",
  "cv-ranker-ai|10101-ai-recruiter-analyze-multiple-cvs-vs-job-description-u.png",
  "linkedin-jobs-ai|8219-scrape-linkedin-jobs-with-gemini-ai-and-store-in-google.png",
  "jobs-newsletter-ai|4470-jobs-newsletter-automation-system-n8n-boltnew-rapidapi-.png",
  "policy-compliance-ai|13318-monitor-employee-policy-compliance-with-gpt-4-slack-an.png",
  "hyperperson-outreach-ai|6039-outreach-for-your-product-using-apollo-linkedin-gpt-41-.png",
  "linkedin-cv-ai|4653-linkedin-profile-extract-and-build-json-resume-with-bri.png",
  "job-app-ai|6748-generate-tailored-resumes-cover-letters-and-interview-p.png",
  "attack-surface-ai|10740-automate-external-attack-surface-mapping-with-shodan-a.png",
  "github-monitor-ai|527-receive-updates-for-github-events.png",
  "secret-expiry-ai|12399-email-reports-on-expiring-microsoft-entra-id-app-secre.png",
  "workflow-error-ai|2150-report-n8n-workflow-errors-to-slack.png",
  "log-cleanup-ai|6833-automated-execution-cleanup-system-with-n8n-api-and-cus.png",
  "uptime-email-ai|3880-monitor-server-uptime-and-get-email-alerts-with-google-.png",
  "iot-backup-ai|2371-request-and-receive-zigbee-backup-from-zigbee2mqtt-and-.png",
  "drive-notify-ai|1283-get-email-notifications-for-newly-uploaded-google-drive.png",
  "ai-news-digest-ai|13527-summarize-ai-news-from-rss-reddit-and-hn-with-claude-t.png",
  "posthog-event-ai|968-create-an-event-in-posthog-when-a-request-is-made-to-a-w.png"
)

$ok = 0
$fail = 0

foreach ($entry in $images) {
  $parts = $entry -split "\|"
  $id    = $parts[0]
  $file  = $parts[1]
  $dest  = Join-Path $out "$id.png"
  $url   = "$base/$file"

  if (Test-Path $dest) {
    Write-Host "  SKIP  $id.png (exists)"
    $ok++
    continue
  }

  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 30
    Write-Host "  OK    $id.png"
    $ok++
  } catch {
    Write-Host "  FAIL  $id.png"
    $fail++
  }
}

Write-Host ""
Write-Host "Done: $ok OK, $fail failed."
