/**
 * WebMCP Integration — Expose portfolio tools to AI agents via the browser.
 *
 * Implements the W3C WebMCP API (https://webmachinelearning.github.io/webmcp/)
 * by registering portfolio tools that AI agents running in the browser can discover
 * and invoke through navigator.modelContext.
 *
 * Each tool declaration follows the JSON Schema-based inputSchema format and
 * provides an execute callback that returns structured portfolio data.
 *
 * Content Signals: ai-train=no, search=yes, ai-input=no
 */

(function () {
  'use strict';

  // Portfolio data — structured information exposed to agents
  const PORTFOLIO_DATA = {
    owner: {
      name: 'Enes Efe Tokta',
      role: 'Unity & .NET Software Developer',
      location: 'Turkey',
      remote: true,
      status: 'Open to Work',
      email: 'enesefetokta009@gmail.com',
      emailDomain: 'hi@enesefetokta.shop',
      github: 'https://github.com/EnesEfeTokta',
      linkedin: 'https://www.linkedin.com/in/enes-efe-tokta-6567151b5/',
      medium: 'https://medium.com/@EnesEfeTokta',
      twitter: 'https://x.com/EnesEfeTokta',
    },
    skills: {
      languages: ['C#', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
      backend: ['ASP.NET Core', 'Web API', 'MVC', 'Entity Framework', 'JWT Auth', 'REST'],
      databases: ['PostgreSQL', 'Redis', 'SQLite', 'Supabase'],
      devops: ['Docker', 'GitHub Actions', 'Azure', 'AWS', 'Prometheus', 'Grafana'],
      gameDev: ['Unity 3D', 'Photon Fusion', 'Physics', 'MVVM', 'Shader Graph'],
      frontend: ['React', 'WPF', 'HTML/CSS', 'Vite', 'Tailwind'],
    },
    stats: {
      repositories: 29,
      commits: '1700+',
      issuesSolved: '225+',
      dailyHours: 10,
    },
    pages: {
      home: 'https://enesefetokta.shop/',
      projects: 'https://enesefetokta.shop/pages/projects.html',
      work: 'https://enesefetokta.shop/pages/work.html',
      biography: 'https://enesefetokta.shop/pages/biography.html',
      education: 'https://enesefetokta.shop/pages/education.html',
      cv: 'https://enesefetokta.shop/pages/cv.html',
      developerStats: 'https://enesefetokta.shop/pages/developer-stats.html',
      futurePlans: 'https://enesefetokta.shop/pages/future-plans.html',
      blog: 'https://enesefetokta.shop/blog/index.html',
    },
    machineReadable: {
      markdown: 'https://enesefetokta.shop/index.md',
      sitemap: 'https://enesefetokta.shop/sitemap.xml',
      apiCatalog: 'https://enesefetokta.shop/.well-known/api-catalog',
      mcpServerCard: 'https://enesefetokta.shop/.well-known/mcp/server-card.json',
      agentSkills: 'https://enesefetokta.shop/.well-known/agent-skills/index.json',
    },
    contentSignals: {
      'ai-train': 'no',
      search: 'yes',
      'ai-input': 'no',
    },
  };

  /**
   * Tool definitions for the WebMCP API.
   * Each tool has: name, description, inputSchema (JSON Schema), execute callback.
   */
  const TOOLS = [
    {
      name: 'get_portfolio_info',
      description:
        "Returns complete structured information about Enes Efe Tokta's portfolio: personal details, skills, stats, page URLs, and machine-readable resource links.",
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: false,
      },
      execute: async (_input) => {
        return {
          success: true,
          data: PORTFOLIO_DATA,
        };
      },
    },
    {
      name: 'get_contact_info',
      description:
        "Returns Enes Efe Tokta's contact details and social media links.",
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: false,
      },
      execute: async (_input) => {
        return {
          success: true,
          data: PORTFOLIO_DATA.owner,
        };
      },
    },
    {
      name: 'get_skills',
      description:
        "Returns Enes Efe Tokta's technical skills organized by category (languages, backend, databases, devops, gameDev, frontend). Optionally filter by category.",
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description:
              "Optional category filter. One of: 'languages', 'backend', 'databases', 'devops', 'gameDev', 'frontend'.",
            enum: ['languages', 'backend', 'databases', 'devops', 'gameDev', 'frontend'],
          },
        },
        required: [],
        additionalProperties: false,
      },
      execute: async (input) => {
        if (input && input.category && PORTFOLIO_DATA.skills[input.category]) {
          return {
            success: true,
            category: input.category,
            data: PORTFOLIO_DATA.skills[input.category],
          };
        }
        return {
          success: true,
          data: PORTFOLIO_DATA.skills,
        };
      },
    },
    {
      name: 'get_page_url',
      description:
        "Returns the URL for a specific portfolio page. Page names: home, projects, work, biography, education, cv, developerStats, futurePlans, blog.",
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            description: 'The page name to get the URL for.',
            enum: [
              'home',
              'projects',
              'work',
              'biography',
              'education',
              'cv',
              'developerStats',
              'futurePlans',
              'blog',
            ],
          },
        },
        required: ['page'],
        additionalProperties: false,
      },
      execute: async (input) => {
        const url = PORTFOLIO_DATA.pages[input.page];
        if (!url) {
          return { success: false, error: `Unknown page: ${input.page}` };
        }
        return { success: true, page: input.page, url };
      },
    },
    {
      name: 'navigate_to_page',
      description:
        "Navigates the browser to a specific portfolio page. Pages: home, projects, work, biography, education, cv, developerStats, futurePlans, blog.",
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            description: 'The page name to navigate to.',
            enum: [
              'home',
              'projects',
              'work',
              'biography',
              'education',
              'cv',
              'developerStats',
              'futurePlans',
              'blog',
            ],
          },
        },
        required: ['page'],
        additionalProperties: false,
      },
      execute: async (input) => {
        const url = PORTFOLIO_DATA.pages[input.page];
        if (!url) {
          return { success: false, error: `Unknown page: ${input.page}` };
        }
        window.location.href = url;
        return { success: true, navigatedTo: url };
      },
    },
    {
      name: 'get_machine_readable_resources',
      description:
        "Returns URLs to machine-readable resources: Markdown version, sitemap, API catalog (RFC 9727), MCP Server Card, and Agent Skills index.",
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: false,
      },
      execute: async (_input) => {
        return {
          success: true,
          data: PORTFOLIO_DATA.machineReadable,
          contentSignals: PORTFOLIO_DATA.contentSignals,
        };
      },
    },
  ];

  /**
   * Register tools with the WebMCP API.
   * Uses an AbortController so tools can be cleanly unregistered when needed.
   */
  function registerWebMCPTools() {
    // Check if the WebMCP API is available
    if (!navigator.modelContext || typeof navigator.modelContext.registerTool !== 'function') {
      // WebMCP API not available in this browser — silently no-op
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    // Register each tool
    for (const tool of TOOLS) {
      try {
        navigator.modelContext.registerTool(
          {
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
          },
          tool.execute,
          { signal }
        );
      } catch (err) {
        // Gracefully handle registration errors (e.g., duplicate names)
        console.warn(`[WebMCP] Failed to register tool "${tool.name}":`, err);
      }
    }

    // Unregister all tools when the page is unloaded
    window.addEventListener('pagehide', () => controller.abort(), { once: true });
  }

  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerWebMCPTools);
  } else {
    registerWebMCPTools();
  }
})();
