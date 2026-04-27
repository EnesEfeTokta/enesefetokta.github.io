# Cloudflare Worker Deployment Guide

This worker adds capabilities GitHub Pages cannot do natively:

1. **RFC 8288 `Link` HTTP response headers** for agent discovery
2. **`Accept: text/markdown` content negotiation** — returns `/index.md` with `Content-Type: text/markdown`
3. **Content-Type fixes** for all `/.well-known/*` endpoints (GitHub Pages serves them as `text/plain`)
4. **CORS headers** for discovery endpoints so cross-origin agents can access them
5. **`X-Content-Signal` header** for AI content usage preferences

## Option A — Deploy via Cloudflare Dashboard (Easiest)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Click **Create Worker**
3. Replace the default script with the contents of `worker.js`
4. Click **Deploy**
5. Go to **Settings → Triggers → Add Route**:
   - Route 1: `*www.enesefetokta.shop/*` → Zone: `enesefetokta.shop`
   - Route 2: `*enesefetokta.shop/*` → Zone: `enesefetokta.shop`
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
| Any HTML page | Adds `Link:` headers for api-catalog, MCP server card, agent skills, OIDC, OAuth, etc. |
| `GET /` with `Accept: text/markdown` | Returns `/index.md` with `Content-Type: text/markdown` + `x-markdown-tokens` |
| `GET /.well-known/api-catalog` | Fixes `Content-Type` to `application/linkset+json` |
| `GET /.well-known/openid-configuration` | Fixes `Content-Type` to `application/json` |
| `GET /.well-known/oauth-authorization-server` | Fixes `Content-Type` to `application/json` |
| `GET /.well-known/oauth-protected-resource` | Fixes `Content-Type` to `application/json` |
| `GET /.well-known/jwks.json` | Fixes `Content-Type` to `application/json` |
| `GET /.well-known/mcp/server-card.json` | Fixes `Content-Type` to `application/json` |
| `GET /.well-known/agent-skills/index.json` | Fixes `Content-Type` to `application/json` |
| Everything else | Passes through with `X-Content-Signal` header |

## Discovery endpoints served (static files in `.well-known/`)

| Endpoint | Standard | Purpose |
|---|---|---|
| `/.well-known/api-catalog` | RFC 9727 | API Catalog for automated API discovery |
| `/.well-known/openid-configuration` | OIDC Discovery | OpenID Connect discovery metadata |
| `/.well-known/oauth-authorization-server` | RFC 8414 | OAuth 2.0 Authorization Server Metadata |
| `/.well-known/oauth-protected-resource` | RFC 9728 | OAuth Protected Resource Metadata |
| `/.well-known/jwks.json` | RFC 7517 | JSON Web Key Set |
| `/.well-known/mcp/server-card.json` | SEP-1649 | MCP Server Card for agent discovery |
| `/.well-known/agent-skills/index.json` | Agent Skills RFC v0.2.0 | Agent Skills discovery index |

## Verifying it works

After deploying, check the response headers:

```bash
# Check Link headers
curl -sI https://www.enesefetokta.shop/ | grep -i link

# Check markdown content negotiation
curl -sI https://www.enesefetokta.shop/ -H "Accept: text/markdown" | grep -i content-type

# Check API catalog Content-Type
curl -sI https://www.enesefetokta.shop/.well-known/api-catalog | grep -i content-type

# Check OIDC discovery
curl -s https://www.enesefetokta.shop/.well-known/openid-configuration | head

# Check OAuth Protected Resource
curl -s https://www.enesefetokta.shop/.well-known/oauth-protected-resource | head

# Check MCP Server Card
curl -s https://www.enesefetokta.shop/.well-known/mcp/server-card.json | head

# Check Agent Skills
curl -s https://www.enesefetokta.shop/.well-known/agent-skills/index.json | head

# Run the full scan
curl -s -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://enesefetokta.shop"}' | jq
```
