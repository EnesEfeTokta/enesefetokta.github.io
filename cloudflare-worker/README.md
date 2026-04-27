# Cloudflare Worker Deployment Guide

This worker adds two things GitHub Pages cannot do natively:
1. **RFC 8288 `Link` HTTP response headers** for agent discovery
2. **`Accept: text/markdown` content negotiation** — returns `/index.md` with `Content-Type: text/markdown`

## Option A — Deploy via Cloudflare Dashboard (Easiest)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Click **Create Worker**
3. Replace the default script with the contents of `worker.js`
4. Click **Deploy**
5. Go to **Settings → Triggers → Add Route**:
   - Route: `*enesefetokta.shop/*`
   - Zone: `enesefetokta.shop`
6. Click **Save**

Done — all requests to your domain now go through the worker.

## Option B — Deploy via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy from this directory
cd cloudflare-worker
wrangler deploy
```

## What the worker does

| Request type | What happens |
|---|---|
| Any HTML page | Adds `Link:` headers pointing to api-catalog, MCP server card, agent skills, etc. |
| `GET /` with `Accept: text/markdown` | Returns `/index.md` with `Content-Type: text/markdown` + `x-markdown-tokens` |
| `GET /.well-known/api-catalog` | Fixes `Content-Type` to `application/linkset+json` |
| Everything else | Passes through unchanged |

## Verifying it works

After deploying, check the response headers:
```bash
curl -sI https://www.enesefetokta.shop/ | grep -i link
curl -sI https://www.enesefetokta.shop/ -H "Accept: text/markdown" | grep -i content-type
```
