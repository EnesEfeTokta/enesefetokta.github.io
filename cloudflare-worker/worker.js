/**
 * Cloudflare Worker — Agent-Ready Header Injection & Content Negotiation
 *
 * This worker intercepts all requests to enesefetokta.shop and:
 *
 * 1. Injects RFC 8288 `Link` headers on every HTML response for agent discovery
 * 2. Handles `Accept: text/markdown` content negotiation — returns /index.md
 *    with `Content-Type: text/markdown` when agents request the homepage
 * 3. Sets correct `Content-Type` for all /.well-known/* JSON endpoints
 *    (GitHub Pages serves them as text/plain)
 * 4. Serves OAuth/OIDC discovery, Protected Resource, and JWKS metadata
 *    with correct Content-Type headers
 *
 * Deploy via Cloudflare Dashboard → Workers & Pages → Create Worker
 * Then add a Route: *enesefetokta.shop/* → this worker
 *
 * Or deploy with Wrangler CLI:
 *   cd cloudflare-worker && npx wrangler deploy
 */

const ORIGIN = 'https://enesefetokta.shop';

/**
 * RFC 8288 Link header value — advertises agent-readable resources.
 * Multiple relations are comma-separated per the spec.
 *
 * Relations used:
 *   - api-catalog   (RFC 9727) → API Catalog discovery
 *   - service-doc   → Human-readable documentation
 *   - describedby   → Machine-readable descriptions
 */
const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</index.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</.well-known/openid-configuration>; rel="openid-configuration"; type="application/json"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
].join(', ');

/**
 * Content-Type overrides for /.well-known/* paths.
 * GitHub Pages serves extensionless files as text/plain or application/octet-stream;
 * agents expect the correct MIME types.
 */
const WELL_KNOWN_CONTENT_TYPES = {
  '/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
  '/.well-known/openid-configuration': 'application/json; charset=utf-8',
  '/.well-known/oauth-authorization-server': 'application/json; charset=utf-8',
  '/.well-known/oauth-protected-resource': 'application/json; charset=utf-8',
  '/.well-known/jwks.json': 'application/json; charset=utf-8',
  '/.well-known/mcp/server-card.json': 'application/json; charset=utf-8',
  '/.well-known/agent-skills/index.json': 'application/json; charset=utf-8',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';

    // ─── Markdown content negotiation ──────────────────────────────────────
    // If an agent requests the homepage (or any HTML page) with Accept: text/markdown,
    // serve the markdown version instead of the HTML page.
    if (
      accept.includes('text/markdown') &&
      (url.pathname === '/' || url.pathname === '/index.html')
    ) {
      const mdUrl = new URL('/index.md', ORIGIN);
      const mdResp = await fetch(mdUrl.toString(), {
        cf: { cacheEverything: true, cacheTtl: 3600 },
      });

      if (mdResp.ok) {
        const body = await mdResp.text();
        const tokenCount = estimateTokens(body);
        return new Response(body, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'x-markdown-tokens': String(tokenCount),
            'Cache-Control': 'public, max-age=3600',
            Vary: 'Accept',
            // Still inject Link headers on markdown responses
            Link: LINK_HEADERS,
          },
        });
      }
    }

    // ─── Pass request through to the origin (GitHub Pages) ─────────────────
    const response = await fetch(request, {
      cf: { cacheEverything: false },
    });

    // Clone headers so we can mutate them
    const newHeaders = new Headers(response.headers);

    // ─── Fix Content-Type for /.well-known/* endpoints ─────────────────────
    // GitHub Pages serves extensionless files as text/plain or octet-stream;
    // agents expect the correct MIME types per their respective RFCs.
    const overrideType = WELL_KNOWN_CONTENT_TYPES[url.pathname];
    if (overrideType) {
      newHeaders.set('Content-Type', overrideType);
    }

    // ─── Inject Link headers on HTML responses ──────────────────────────────
    const contentType = newHeaders.get('Content-Type') || '';
    if (contentType.includes('text/html')) {
      newHeaders.set('Link', LINK_HEADERS);
      // Add Vary so caches know this response may differ by Accept
      newHeaders.append('Vary', 'Accept');
    }

    // ─── CORS for machine-readable endpoints ───────────────────────────────
    // Allow agents from any origin to access discovery endpoints
    if (url.pathname.startsWith('/.well-known/')) {
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      newHeaders.set('Access-Control-Allow-Headers', 'Accept, Content-Type');
    }

    // ─── Content-Signal header (informational) ──────────────────────────────
    newHeaders.set('X-Content-Signal', 'ai-train=no, search=yes, ai-input=no');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};

/**
 * Rough GPT-style token estimator (≈ 4 chars/token).
 * Used for the x-markdown-tokens header.
 */
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}
