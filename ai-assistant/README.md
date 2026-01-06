# Accessibility AI Assistant

An AI-powered assistant using Google Gemini 3.0 Flash for:
- Answering accessibility questions
- Generating alt text for images
- Providing guidance based on site content

## Prerequisites

Before deploying, you'll need:

1. **A Cloudflare account** (free) - [Sign up at cloudflare.com](https://dash.cloudflare.com/sign-up)
2. **Node.js 18+** installed - [Download from nodejs.org](https://nodejs.org/)
3. **A Google AI API key** - [Get one at aistudio.google.com](https://aistudio.google.com/apikey)

## Quick Start

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select "Create API key in new project" (or use existing)
5. Copy the key (starts with `AIza...`)
6. **Keep this key secret** - never commit it to git

### 2. Install Dependencies

```bash
# Navigate to the ai-assistant folder
cd ai-assistant

# Install Node.js dependencies
npm install

# Install Wrangler CLI globally (Cloudflare's deployment tool)
npm install -g wrangler
```

### 3. Login to Cloudflare

```bash
wrangler login
```

This opens a browser window. Log in and authorize Wrangler.

### 4. Set Your API Key as a Secret

```bash
wrangler secret put GEMINI_API_KEY
```

When prompted, paste your Gemini API key and press Enter.

### 5. Deploy

```bash
wrangler deploy
```

You'll see output like:
```
Deployed a11y-assistant (1.0.0)
  https://a11y-assistant.your-subdomain.workers.dev
```

**Save this URL** - you'll need it for the site integration.

### 6. Test the Deployment

Open your deployed URL in a browser. You should see the AI Assistant interface.

### 7. Update the Site

Edit `docs/ai-assistant.html` and replace the placeholder URL:

```javascript
// Find this line (around line 92):
const ASSISTANT_URL = 'https://a11y-assistant.your-subdomain.workers.dev';

// Replace with your actual deployed URL:
const ASSISTANT_URL = 'https://a11y-assistant.YOUR-SUBDOMAIN.workers.dev';
```

## Local Development

To test changes locally before deploying:

```bash
# Create a .dev.vars file with your API key (git-ignored)
echo "GEMINI_API_KEY=your-api-key-here" > .dev.vars

# Start local development server
npm run dev
```

Open http://localhost:8787 to test.

## Configuration

### Environment Variables

| Variable          | Required | Description                                                                  |
| ----------------- | -------- | ---------------------------------------------------------------------------- |
| `GEMINI_API_KEY`  | Yes      | Your Google AI API key                                                       |
| `ALLOWED_ORIGINS` | No       | Comma-separated list of allowed domains (default: *.arizona.edu,localhost:*) |
| `MAX_TOKENS`      | No       | Max response tokens (default: 1024)                                          |

### Restricting Access by Domain

Edit `wrangler.toml` to change allowed origins:

```toml
[vars]
ALLOWED_ORIGINS = "*.arizona.edu,accessibility.arizona.edu"
```

### Custom Domain (Optional)

To use a custom domain like `assistant.accessibility.arizona.edu`:

1. Add the domain in Cloudflare Dashboard → Workers → Your Worker → Triggers → Custom Domains
2. Update `wrangler.toml`:

```toml
routes = [
  { pattern = "assistant.accessibility.arizona.edu", custom_domain = true }
]
```

## Cost Summary

### Cloudflare Workers (Free Tier)
- **100,000 requests per day** - more than enough
- No credit card required
- $0/month for typical usage

### Gemini 3.0 Flash API
Check current pricing at https://ai.google.dev/pricing

Estimated costs for typical usage:
- **1,000 questions/month**: ~$0.05-0.10
- **1,000 image analyses/month**: ~$0.10-0.20
- **Total**: Under $0.50/month for moderate usage

## Updating the Assistant

To deploy updates:

```bash
cd ai-assistant
wrangler deploy
```

Changes go live immediately.

## Monitoring

View real-time logs:

```bash
wrangler tail
```

View analytics in Cloudflare Dashboard → Workers → Your Worker → Analytics.

## Troubleshooting

### "API key not valid"
- Verify your key at https://aistudio.google.com/apikey
- Re-run `wrangler secret put GEMINI_API_KEY`
- Redeploy with `wrangler deploy`

### "CORS error" in browser console
- Check that your domain is in `ALLOWED_ORIGINS` in wrangler.toml
- Redeploy after changes

### "Error: Could not connect to server"
- Check the worker URL is correct in ai-assistant.html
- Verify the worker is deployed: `wrangler deployments list`

### Assistant gives wrong/outdated info
- Update the system prompt in `src/prompts.js`
- Redeploy with `wrangler deploy`

## Files Reference

```
ai-assistant/
├── README.md              # This file
├── package.json           # Node.js dependencies
├── wrangler.toml          # Cloudflare Workers configuration
├── .dev.vars              # Local dev secrets (git-ignored, you create this)
└── src/
    ├── index.js           # Main worker entry point & API routes
    ├── gemini.js          # Gemini API client
    ├── prompts.js         # System prompts (customize here!)
    └── ui.js              # Chat interface HTML
```

## Customizing Prompts

Edit `src/prompts.js` to customize:

- **System prompt**: What the assistant knows and how it responds
- **Alt text prompt**: Instructions for generating alt text

After editing, redeploy with `wrangler deploy`.

## Security Notes

1. **API Key Protection**: Your Gemini key is stored as a Cloudflare secret, never exposed to browsers
2. **Domain Restriction**: Only allows requests from configured domains
3. **Input Limits**: Messages limited to 2000 chars, images to 4MB
4. **No Data Storage**: Questions and images are not stored after processing

## Support

Questions about the assistant? Contact accessibility@arizona.edu
