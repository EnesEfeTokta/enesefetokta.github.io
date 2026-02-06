const projectsData = [
    // .NET Projects
    {
        id: "vidsync",
        title: "VidSync",
        description: "AI-powered video meeting platform with real-time collaboration. Integrated with Mistral 7B AI model for meeting assistance.",
        tags: ["ASP.NET Core", "React", "WebRTC", "Docker"],
        icon: "fas fa-video",
        link: "projects/details/vidsync.html",
        category: "dotnet"
    },
    {
        id: "fintrack-api",
        title: "FinTrack API",
        description: "Comprehensive financial management RESTful API. Features expense tracking, budget planning, and AI chatbot.",
        tags: ["REST API", "Entity Framework", "JWT Auth", "AI Integration"],
        icon: "fas fa-server",
        link: "projects/details/fintrack-webapi.html",
        category: "dotnet"
    },
    {
        id: "fintrack-desktop",
        title: "FinTrack Desktop",
        description: "WPF desktop client for the FinTrack ecosystem.",
        tags: ["WPF", "MVVM", "Sync"],
        icon: "fab fa-windows",
        link: "projects/details/fintrack-desktop.html",
        category: "dotnet"
    },
    {
        id: "weather-zero",
        title: "Weather Zero+",
        description: "Modern weather dashboard application.",
        tags: ["WPF", "Supabase"],
        icon: "fas fa-cloud-sun",
        link: "projects/details/weather-zero-plus.html",
        category: "dotnet"
    },

    // Unity Projects
    {
        id: "atlas",
        title: "Atlas - Multiplayer Strategy",
        description: "A sci-fi multiplayer strategy game built with Photon Fusion. Two players compete on a planet, building bases and commanding air and ground units.",
        tags: ["Unity 3D", "C#", "Photon Fusion", "Multiplayer", "Low Poly"],
        icon: "fas fa-globe",
        link: "projects/details/atlas-game.html",
        category: "unity"
    },
    {
        id: "fishing-game",
        title: "Fishing Game",
        description: "A fun spear throwing game about fishing in a lake. Features custom physics and dynamic spawning systems.",
        tags: ["Unity 3D", "C#", "Physics"],
        icon: "fas fa-fish",
        link: "projects/details/fishing-game.html",
        category: "unity"
    },

    // TS/JS Projects
    {
        id: "chunk-radar",
        title: "Chunk-Radar",
        description: "A modern flashcard application using the chunking method for English language learning. Built with React, TypeScript, and developed using the Vibe-Coding approach.",
        tags: ["React 18", "TypeScript", "Vite", "Express.js", "Vibe-Coding"],
        icon: "fas fa-language",
        link: "projects/details/chunk-radar.html",
        category: "web"
    },
    {
        id: "habit-tracker-mcp",
        title: "Habit Tracker MCP",
        description: "An MCP server enabling AI assistants like Claude to track and analyze daily habits through natural conversation with local data storage.",
        tags: ["Node.js", "MCP", "AI", "LowDB"],
        icon: "fas fa-server",
        link: "projects/details/habit-tracker-mcp.html",
        category: "web"
    },
    {
        id: "fertile-notify",
        title: "Fertile Notify",
        description: "An event-driven notification platform for centralized multi-channel notification management built with .NET 9 and Clean Architecture.",
        tags: [".NET 9", "Clean Architecture", "PostgreSQL", "Docker"],
        icon: "fas fa-bell",
        link: "projects/details/fertile-notify.html",
        category: "dotnet"
    }
];

console.log("Projects data loaded:", projectsData.length);
