# Firecrawl n8n Integration

This directory contains JSON workflow files that replicate your Firecrawl API functionality in n8n.

## Prerequisites

1.  **Install n8n**: Make sure you have n8n running.
2.  **Install Firecrawl Node**: 
    - Go to **Settings > Community Nodes** in n8n.
    - Install `@mendable/n8n-nodes-firecrawl`.
3.  **Setup Google Sheets (The Database)**:
    - Create a new Google Sheet.
    - Add these headers to the first row: `id`, `url`, `name`, `type`, `frequency`, `status`, `webhookUrl`.

## Importing the Workflows

1.  Open n8n.
2.  Create a new workflow.
3.  Click the three dots in the top right -> **Import from File**.
4.  Select one of the JSON files from this directory.

## Workflows Explained

### 1. On-Demand Check (`1-check-website.json`)
- **Trigger**: `POST` webhook to your n8n instance.
- **Action**: Uses Firecrawl node to scrape the URL immediately.
- **Output**: Returns the scrape result directly.

### 2. Website Manager (`2-manager.json`)
- **Trigger**: `POST` / `DELETE` webhooks.
- **Action**: Adds or removes rows from your Google Sheet.
- **Use**: This replaces your `websites` table in Convex.

### 3. Scheduler (`3-scheduler.json`)
- **Trigger**: Runs every 15 minutes (configurable).
- **Action**: 
    1. Reads your Google Sheet.
    2. Loops through each website.
    3. Runs Firecrawl.
    4. Sends a POST request to the user's webhook if configured.

## Configuration
After importing, you must:
1.  Open the **Google Sheets** nodes and select your Google credential and the specific Sheet you created.
2.  Open the **Firecrawl** nodes and add your Firecrawl API Key.

