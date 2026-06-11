export default {
  brand: {
    name: 'Hermes Studio',
    logoAlt: 'Hermes',
  },
  ui: {
    copy: 'Copy',
    copied: 'Copied!',
    darkTheme: 'Dark',
    lightTheme: 'Light',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    menu: 'Menu',
    switchToChinese: 'Chinese',
    switchToEnglish: 'English',
  },
  nav: {
    home: 'Home',
    docs: 'Documentation',
    github: 'GitHub',
  },
  hero: {
    navLabel: 'Hero navigation',
    nav: {
      workspace: 'Workspace',
      runtime: 'Runtime',
      automation: 'Automation',
      deploy: 'Deploy',
    },
    badge: 'Local-first AI Agent Workspace',
    title: 'Hermes Studio',
    subtitle: 'A desktop app and local control plane for Hermes Agent. Chat, manage profiles, run coding agents, inspect files, automate jobs, and keep your runtime under your control.',
    cta: 'Download Desktop',
    docsCta: 'Read Docs',
    viewGithub: 'View on GitHub',
    downloadDesktop: 'Download Desktop',
    latestRelease: 'Latest Release',
    getInstallers: 'Get Installers',
    docsTitle: 'Documentation',
    docsLibrary: 'Library',
    install: 'npm install -g hermes-web-ui',
    previewAlt: 'Hermes Studio dashboard preview',
  },
  features: {
    title: 'One Local Console for Hermes Agent',
    desc: 'Hermes Studio brings chat, runtime management, automation, files, coding agents, and release-ready desktop distribution into one workspace.',
    streaming: {
      title: 'Streaming Chat',
      desc: 'Real-time SSE-powered AI conversations with multi-session management, Markdown rendering, and code syntax highlighting.',
    },
    platforms: {
      title: 'Platform Channels',
      desc: 'Configure Telegram, Discord, Slack, WhatsApp, Matrix, Feishu, WeChat, and WeCom credentials and behavior from one page.',
    },
    multiModel: {
      title: 'Models & Providers',
      desc: 'Discover models from profile credentials, manage OpenAI-compatible providers, switch defaults, and use OAuth flows for supported services.',
    },
    groupChat: {
      title: 'Group Chat',
      desc: 'Multi-agent chat rooms with mention routing, context compression, and real-time collaboration.',
    },
    kanban: {
      title: 'Jobs & Kanban',
      desc: 'Schedule cron jobs, trigger runs immediately, and organize agent work on a profile-aware Kanban board.',
    },
    analytics: {
      title: 'Usage Analytics',
      desc: 'Token usage breakdown, cost tracking, cache hit rates, model distribution, and 30-day trends.',
    },
    profiles: {
      title: 'Multi-Profile',
      desc: 'Isolated profiles with independent configs. Clone, import/export profiles, run multiple gateways.',
    },
    files: {
      title: 'File Browser',
      desc: 'Manage files across local, Docker, SSH, and Singularity backends with upload, preview, and edit.',
    },
    terminal: {
      title: 'Web Terminal',
      desc: 'Full PTY terminal in the browser with multi-session support via WebSocket and xterm.js.',
    },
    quickInstall: {
      title: 'One Command',
      desc: 'Install and start with a single command. Auto-detects config, resolves ports, opens the browser.',
    },
    i18n: {
      title: 'Coding Agents & MCP',
      desc: 'Launch local coding-agent sessions, use Codex and Claude Code proxy routes, and manage the bundled hermes-studio MCP server.',
    },
    theme: {
      title: 'Updates & Releases',
      desc: 'Desktop updates check Cloudflare first with GitHub fallback, while full desktop releases are manually promoted to GitHub Latest.',
    },
  },
  platforms: {
    title: 'Unified Platform Management',
    desc: 'Configure credentials and behavior for 8 messaging platforms from a single settings page.',
    telegram: 'Telegram',
    discord: 'Discord',
    slack: 'Slack',
    whatsapp: 'WhatsApp',
    matrix: 'Matrix',
    feishu: 'Feishu',
    wechat: 'WeChat',
    wecom: 'WeCom',
  },
  screenshots: {
    localUrl: 'http://localhost:8648',
    tourLabel: 'Product tour',
    previous: 'Previous screenshot',
    next: 'Next screenshot',
    goTo: 'View screenshot {number}',
    items: [
      {
        src: '/image1.png',
        alt: 'Hermes Studio chat workspace with Claude Code agent',
        title: 'Agent Chat',
        desc: 'Chat with Claude Code, Codex, and Hermes using model routing and session history.',
      },
      {
        src: '/image2.png',
        alt: 'Hermes Studio version preview workspace',
        title: 'Version Preview',
        desc: 'Preview a tag or branch in an isolated workspace with build and log controls.',
      },
      {
        src: '/image3.png',
        alt: 'Hermes Studio version manager modal',
        title: 'Version Manager',
        desc: 'Switch Runtime and Web UI versions, then download assets from GitHub or Cloudflare.',
      },
      {
        src: '/image4.png',
        alt: 'Hermes Studio file workspace',
        title: 'File Workspace',
        desc: 'Browse state, upload files, create folders, and jump between files and terminal.',
      },
    ],
  },
  install: {
    title: 'Quick Start',
    desc: 'Download the desktop app or run Hermes Studio yourself.',
    desktop: {
      title: 'Desktop',
      download: 'Download',
      githubDownload: 'GitHub Download',
      cloudflareDownload: 'Cloudflare Download',
      allDownloads: 'View all release assets',
      prereq: 'Desktop builds bundle the Hermes Studio runtime.',
      downloads: [
        {
          title: 'macOS Apple Silicon',
          desc: 'Apple Silicon DMG',
          assetSuffix: 'arm64.dmg',
        },
        {
          title: 'macOS Intel',
          desc: 'x64 DMG',
          assetSuffix: 'x64.dmg',
        },
        {
          title: 'Windows',
          desc: 'x64 installer',
          assetSuffix: 'x64.exe',
        },
        {
          title: 'Linux x64 AppImage',
          desc: 'x64 AppImage',
          assetSuffix: 'x86_64.AppImage',
        },
        {
          title: 'Linux x64 Debian',
          desc: 'amd64 .deb package',
          assetSuffix: 'amd64.deb',
        },
        {
          title: 'Linux arm64',
          desc: 'arm64 AppImage',
          assetSuffix: 'arm64.AppImage',
        },
      ],
    },
    npm: {
      title: 'npm',
      cmd1: 'npm install -g hermes-web-ui',
      cmd2: 'hermes-web-ui start',
    },
    docker: {
      title: 'Docker',
      cmd: 'docker compose up -d',
    },
    source: {
      title: 'From Source',
      cmd1: 'git clone <your-repo-url>',
      cmd2: 'cd hermes-web-ui && npm install && npm run dev',
    },
    prereq: 'Requires Node.js >= 23',
  },
  starHistory: {
    title: 'Growing Community',
    desc: 'Star us on GitHub and join the community.',
    star: 'Star',
    licenseAlt: 'License',
    versionAlt: 'Version',
    chartAlt: 'Star History',
  },
  footer: {
    description: 'Self-hosted AI chat dashboard for Hermes Agent.',
    license: 'BSL-1.1 License',
    madeWith: 'Built with Vue 3, Naive UI, and TypeScript.',
    github: 'Open GitHub',
    douyin: 'Open Douyin',
    xiaohongshu: 'Open Xiaohongshu',
  },
  docs: {
    placeholder: 'Select a section from the sidebar to get started.',
    sidebar: {
      gettingStarted: 'Getting Started',
      configuration: 'Configuration',
      features: 'Features',
      hermesStudioManual: 'Client Manual',
      platforms: 'Platform Guides',
      api: 'API Reference',
    },
    gettingStarted: {
      title: 'Getting Started',
      intro: 'Hermes Studio is a self-hosted web dashboard for managing AI conversations, platform channels, scheduled jobs, and more. It wraps the Hermes Agent CLI and provides a beautiful web interface.',
      install: {
        title: 'Installation',
        content: 'Install globally via npm. Node.js 23 or higher is required.',
      },
      firstRun: {
        title: 'First Run',
        content: 'On first start, Hermes Web UI will automatically generate an auth token, validate configuration files, start the Hermes gateway, and open the dashboard in your browser.',
      },
      login: {
        title: 'Login',
        content: 'The auto-generated token is stored in ~/.hermes-web-ui/.token. You can also set up username/password login from the Settings page after your first login.',
      },
    },
    configuration: {
      title: 'Configuration',
      intro: 'Hermes Studio can be configured via environment variables.',
      envVars: {
        title: 'Environment Variables',
        rows: [
          ['AUTH_DISABLED', 'Set to "1" to disable authentication'],
          ['AUTH_TOKEN', 'Custom auth token (overrides auto-generated)'],
          ['PORT', 'Server listen port (default: 8648)'],
          ['BIND_HOST', 'Server bind host (default: 0.0.0.0). Set :: explicitly to enable IPv6 listening.'],
          ['UPLOAD_DIR', 'Custom upload directory path'],
          ['CORS_ORIGINS', 'CORS origin config (default: *)'],
          ['HERMES_BIN', 'Custom path to hermes CLI binary'],
        ],
      },
      gateway: {
        title: 'Gateway Management',
        content: 'The gateway is the Hermes Agent process that handles AI conversations. Hermes Web UI manages the gateway lifecycle — start, stop, and monitor from the Gateways page. Multiple gateways can run with different profiles, and each profile resolves its own gateway host/port from its Hermes config.',
      },
      profiles: {
        title: 'Profiles',
        content: 'Profiles provide isolated configurations for different use cases. Each profile has its own Hermes config, cache, and gateway. Create, clone, import, or export profiles from the Profiles page.',
      },
    },
    features: {
      title: 'Features',
      intro: 'Explore the core features of Hermes Studio.',
      chat: {
        title: 'AI Chat',
        content: 'Real-time streaming chat powered by Server-Sent Events. Supports multi-session management, Markdown rendering with syntax highlighting, tool call inspection, file upload/download, and global search across all conversations (Ctrl+K).',
      },
      kanban: {
        title: 'Kanban Board',
        content: 'A visual task management board with 7 status columns: triage, todo, ready, running, blocked, done, and archived. Supports assignee management, filtering, and detailed task editing via a side drawer.',
      },
      groupChat: {
        title: 'Group Chat',
        content: 'Multi-agent chat rooms where multiple AI agents collaborate. Features mention routing to trigger specific agents, automatic context compression when history exceeds limits, typing indicators, and SQLite-based message persistence.',
      },
      jobs: {
        title: 'Scheduled Jobs',
        content: 'Create and manage cron-based scheduled jobs that run AI tasks automatically. Configure schedule, prompt, and model for each job.',
      },
      skills: {
        title: 'Skills',
        content: 'Browse and manage installed AI skills. Skills extend the agent\'s capabilities with specialized knowledge and tool integrations.',
      },
      memory: {
        title: 'Memory',
        content: 'Manage agent memory and user notes. The agent uses memory to maintain context across conversations and personalize responses.',
      },
      terminal: {
        title: 'Terminal',
        content: 'Full pseudo-terminal in the browser powered by node-pty and xterm.js. Supports multiple terminal sessions, real-time keyboard input, and window resizing via WebSocket.',
      },
      files: {
        title: 'File Browser',
        content: 'Browse and manage files on remote backends including local, Docker, SSH, and Singularity. Upload, download, rename, move, delete files, and preview content with syntax highlighting.',
      },
      analytics: {
        title: 'Usage Analytics',
        content: 'Track token usage (input/output), estimated costs, cache hit rates, session counts, and model distribution. View 30-day daily trends with interactive charts.',
      },
    },
    hermesStudioManual: {
      title: 'Hermes Studio Client Manual',
      intro: 'This page publishes the complete Hermes Studio 0.6.12 client operations manual. The full manual is currently authored in Chinese and covers day-to-day usage, configuration, operations, acceptance review, internal training, visible navigation, dialogs, status pages, key actions, common workflows, and risk notes.',
      open: {
        title: 'Open the full manual',
        content: 'The uploaded manual preserves the original HTML layout, annotated screenshots, tables, and PDF export. Use the HTML version for online browsing and the PDF version for offline review, archiving, or training distribution.',
        links: [
          {
            label: 'Open the Chinese HTML manual',
            href: '/docs/hermes-studio-0.6.12-full-cn/index.html',
            description: 'Includes the full table of contents, annotated screenshots, workflow sections, tables, and operational notes.',
          },
          {
            label: 'Download the Chinese PDF manual',
            href: '/docs/hermes-studio-0.6.12-full-cn/hermes-studio-0.6.12-full-cn.pdf',
            description: 'Best for offline reading, archival use, printing, and training handouts.',
          },
        ],
      },
      scope: {
        title: 'Scope',
        rows: [
          ['Version', 'Hermes Studio 0.6.12 client operations manual'],
          ['Language', 'Full manual in Chinese, with bilingual website entry copy'],
          ['Coverage', 'Login, chat, history, memory, skills, plugins, files, terminal, jobs, group chat, Kanban, usage, logs, MCP, platform integrations, devices, settings, backup, security, and troubleshooting'],
          ['Audience', 'Individual users, administrators, support teams, acceptance reviewers, and internal training teams'],
        ],
      },
      maintenance: {
        title: 'Maintenance note',
        content: 'When the website, reference docs, Hermes agent docs, and the current client UI differ, the manual treats the currently visible client interface as the operational source of truth. For future releases, replace the uploaded HTML/PDF assets and update the version scope on this page.',
      },
    },
    platforms: {
      title: 'Platform Guides',
      intro: 'Configure messaging platform integrations from the Channels settings page.',
      telegram: {
        title: 'Telegram',
        content: 'Create a Telegram Bot via BotFather, then enter the bot token. Configure mention requirements, free-response chats, and reaction handling.',
      },
      discord: {
        title: 'Discord',
        content: 'Create a Discord Bot in the Developer Portal. Supports auto-thread creation, allowed/ignored channels, reaction handling, and free-response channels.',
      },
      slack: {
        title: 'Slack',
        content: 'Create a Slack App with bot token scope. Configure mention requirements, bot allowlisting, and free-response channels.',
      },
      whatsapp: {
        title: 'WhatsApp',
        content: 'Enable WhatsApp integration and configure mention patterns and free-response chats.',
      },
      matrix: {
        title: 'Matrix',
        content: 'Provide access token and homeserver URL. Supports auto-thread, DM mention threads, and free-response rooms.',
      },
      feishu: {
        title: 'Feishu (Lark)',
        content: 'Register a Feishu app and configure App ID and Secret.',
      },
      wechat: {
        title: 'WeChat',
        content: 'Scan the QR code from the settings page to log in. Credentials are auto-saved for subsequent sessions.',
      },
      wecom: {
        title: 'WeCom',
        content: 'Configure Bot ID and Secret from the WeCom admin console.',
      },
    },
    api: {
      title: 'API Reference',
      intro: 'Hermes Web UI provides both a local BFF API and proxies requests to the upstream Hermes gateway.',
      local: {
        title: 'Local BFF Endpoints',
        content: 'The Koa server handles session management, profile CRUD, config read/write, log access, skill listing, and memory operations. These endpoints call the Hermes CLI directly.',
      },
      proxy: {
        title: 'Gateway Proxy',
        content: 'Requests to /api/hermes/v1/* are forwarded to the Hermes gateway. This includes AI model interactions, run management, and streaming events.',
      },
      auth: {
        title: 'Authentication',
        content: 'All API endpoints require a Bearer token via the Authorization header. The token is auto-generated on first run and stored in ~/.hermes-web-ui/.token. Optional username/password login can be configured from the Settings page.',
      },
    },
  },
}
