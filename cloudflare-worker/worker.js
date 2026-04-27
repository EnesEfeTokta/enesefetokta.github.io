/**
 * Cloudflare Worker — Agent-Ready Header Injection
 *
 * This worker intercepts all requests to enesefetokta.shop and:
 *
 * 1. Injects RFC 8288 `Link` headers on every HTML response for agent discovery
 * 2. Handles `Accept: text/markdown` content negotiation — returns /index.md
 *    with `Content-Type: text/markdown` when agents request the homepage
 * 3. Sets correct `Content-Type` for /.well-known/api-catalog (application/linkset+json)
 *
 * Deploy via Cloudflare Dashboard → Workers & Pages → Create Worker
 * Then add a Route: *enesefetokta.shop/* → this worker
 *
 * Or deploy with Wrangler CLI:
 *   cd cloudflare-worker && npx wrangler deploy
 */

const ORIGIN = 'https://enesefetokta.shop';

/**
 * RFC 8288 Link header value — advertises agent-readable resources
 * Multiple relations are comma-separated per the spec.
 */
const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</index.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
].join(', ');

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

    // ─── Fix Content-Type for /.well-known/api-catalog ─────────────────────
    // GitHub Pages serves this as text/plain or application/octet-stream;
    // agents expect application/linkset+json.
    if (url.pathname === '/.well-known/api-catalog') {
      newHeaders.set('Content-Type', 'application/linkset+json; charset=utf-8');
    }

    // ─── Inject Link headers on HTML responses ──────────────────────────────
    const contentType = newHeaders.get('Content-Type') || '';
    if (contentType.includes('text/html')) {
      newHeaders.set('Link', LINK_HEADERS);
      // Add Vary so caches know this response may differ by Accept
      newHeaders.append('Vary', 'Accept');
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
