export interface VibeTool {
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

export const vibeTools: VibeTool[] = [
  // Marketing, Outreach, and Branding
  {
    name: "Vibe Marketing",
    url: "https://outnurture.com",
    description: "Text to marketing campaigns/workflows and sales pipelines",
    category: "Marketing, Outreach, and Branding",
    tags: ["marketing", "campaigns", "workflows", "sales", "pipelines"]
  },
  {
    name: "Vibe Influencer Marketing",
    url: "https://stormy.ai/",
    description: "AI-powered influencer search and analysis",
    category: "Marketing, Outreach, and Branding",
    tags: ["influencer", "analysis", "search", "ai"]
  },
  {
    name: "Vibe Advertising",
    url: "https://www.omneky.com/",
    description: "Text to multichannel ad creatives",
    category: "Marketing, Outreach, and Branding",
    tags: ["advertising", "creatives", "multichannel"]
  },
  {
    name: "Vibe Branding",
    url: "https://looka.com/",
    description: "Text to logo/brand kit generation",
    category: "Marketing, Outreach, and Branding",
    tags: ["branding", "logo", "brand kit", "generation"]
  },
  {
    name: "Vibe Visual Ad Generation",
    url: "https://adcreative.ai/",
    description: "Text to product ads for ecommerce",
    category: "Marketing, Outreach, and Branding",
    tags: ["visual", "ads", "ecommerce", "product"]
  },
  {
    name: "Vibe Content Strategy",
    url: "https://www.digitalfirst.ai/",
    description: "Text to blog and social post calendars",
    category: "Marketing, Outreach, and Branding",
    tags: ["content", "strategy", "blog", "social", "calendar"]
  },
  {
    name: "Vibe Social Media",
    url: "https://buffer.com/ai-assistant/",
    description: "Text to social media posts & scheduling",
    category: "Marketing, Outreach, and Branding",
    tags: ["social media", "posts", "scheduling"]
  },

  // Design, Product, and Prototyping
  {
    name: "Vibe Design",
    url: "https://uizard.io/",
    description: "Text to app UI/design mockups",
    category: "Design, Product, and Prototyping",
    tags: ["design", "ui", "mockups", "app"]
  },
  {
    name: "Vibe Product Design",
    url: "https://www.usegalileo.ai/",
    description: "Text to product/app prototypes",
    category: "Design, Product, and Prototyping",
    tags: ["product", "prototypes", "app"]
  },
  {
    name: "Vibe UI/UX Design",
    url: "https://uizard.io/",
    description: "Text to web/app UI mockups",
    category: "Design, Product, and Prototyping",
    tags: ["ui", "ux", "design", "web", "app", "mockups"]
  },
  {
    name: "Vibe App Prototyping",
    url: "https://lovable.so/",
    description: "Text to mobile/web app prototypes",
    category: "Design, Product, and Prototyping",
    tags: ["app", "prototyping", "mobile", "web"]
  },

  // Video, Audio, and Content Creation
  {
    name: "Vibe Video",
    url: "https://runwayml.com/",
    description: "Text to video generation/effects",
    category: "Video, Audio, and Content Creation",
    tags: ["video", "generation", "effects"]
  },
  {
    name: "Vibe Video Editing",
    url: "https://runwayml.com/",
    description: "Text to video edits and effects",
    category: "Video, Audio, and Content Creation",
    tags: ["video", "editing", "effects"]
  },
  {
    name: "Vibe Animation",
    url: "https://pika.art/",
    description: "Text to animated scenes",
    category: "Video, Audio, and Content Creation",
    tags: ["animation", "scenes"]
  },
  {
    name: "Vibe Audio",
    url: "https://www.elevenlabs.io/",
    description: "Text to voice cloning/audio editing",
    category: "Video, Audio, and Content Creation",
    tags: ["audio", "voice", "cloning", "editing"]
  },
  {
    name: "Vibe Audio Storytelling",
    url: "https://podcastle.ai/",
    description: "Text to podcast or voiceover production",
    category: "Video, Audio, and Content Creation",
    tags: ["audio", "storytelling", "podcast", "voiceover"]
  },
  {
    name: "Vibe E-learning Course",
    url: "https://www.tome.app/",
    description: "Text to narrated slideshows or training",
    category: "Video, Audio, and Content Creation",
    tags: ["e-learning", "slideshows", "training", "narrated"]
  },
  {
    name: "Vibe Presentation Design",
    url: "https://gamma.app/",
    description: "Text to beautiful, interactive presentations",
    category: "Video, Audio, and Content Creation",
    tags: ["presentation", "design", "interactive"]
  },
  {
    name: "Vibe Slide Decks",
    url: "https://tome.app/",
    description: "Text to presentation decks",
    category: "Video, Audio, and Content Creation",
    tags: ["slides", "presentation", "decks"]
  },

  // Copywriting, Communication, and Research
  {
    name: "Vibe Copywriting",
    url: "https://jasper.ai/",
    description: "Text to blog/social/email copy",
    category: "Copywriting, Communication, and Research",
    tags: ["copywriting", "blog", "social", "email", "copy"]
  },
  {
    name: "Vibe Research",
    url: "https://elicit.com/",
    description: "Text to structured research/summaries",
    category: "Copywriting, Communication, and Research",
    tags: ["research", "structured", "summaries"]
  },

  // Web and App Development
  {
    name: "Vibe Website Creation",
    url: "https://durable.co/",
    description: "Text to rapid website creation",
    category: "Web and App Development",
    tags: ["website", "creation", "rapid"]
  },
  {
    name: "Vibe Website Building",
    url: "https://durable.co/",
    description: "Text to small business website",
    category: "Web and App Development",
    tags: ["website", "building", "small business"]
  },
  {
    name: "Vibe Coding (backend)",
    url: "https://www.ycombinator.com/companies/vibeflow",
    description: "Backend coding assistance",
    category: "Web and App Development",
    tags: ["coding", "backend", "development"]
  },
  {
    name: "Vibe Engineering",
    url: "https://adam.new/",
    description: "Text to CAD or 3D designs",
    category: "Web and App Development",
    tags: ["engineering", "cad", "3d", "design"]
  },
  {
    name: "Vibe Video Game Creation",
    url: "http://rosebud.ai/",
    description: "Video game creation tools",
    category: "Web and App Development",
    tags: ["video games", "creation", "gaming"]
  },

  // Agents, Automation, and Support
  {
    name: "Vibe AI Agent Creation",
    url: "https://okibi.ai/",
    description: "AI agent creation platform",
    category: "Agents, Automation, and Support",
    tags: ["ai", "agents", "creation"]
  },
  {
    name: "Vibe Customer Support Agent",
    url: "https://intercom.com/blog/announcing-fin-ai-customer-support-agent/",
    description: "Chatbot/AI agent builder",
    category: "Agents, Automation, and Support",
    tags: ["customer support", "chatbot", "ai agent"]
  },
  {
    name: "Vibe Workflow Automation",
    url: "https://lindy.ai/",
    description: "Text to CRM workflows and task automations",
    category: "Agents, Automation, and Support",
    tags: ["workflow", "automation", "crm", "tasks"]
  },
  {
    name: "Vibe Knowledge Base Creation",
    url: "https://www.magical.so/",
    description: "Text to internal docs and workflows",
    category: "Agents, Automation, and Support",
    tags: ["knowledge base", "internal docs", "workflows"]
  },
  {
    name: "Vibe Internal Comms",
    url: "https://otisai.com/",
    description: "Text to HR announcements and company docs",
    category: "Agents, Automation, and Support",
    tags: ["internal", "communications", "hr", "announcements"]
  },

  // Analytics and Reporting
  {
    name: "Vibe Data Analysis",
    url: "https://akkio.com/",
    description: "Text to analytics/dashboards",
    category: "Analytics and Reporting",
    tags: ["data", "analysis", "analytics", "dashboards"]
  },
  {
    name: "Vibe Business Reports",
    url: "https://pdl.com/",
    description: "Text to company due diligence packs",
    category: "Analytics and Reporting",
    tags: ["business", "reports", "due diligence"]
  },

  // Email and Internal Docs
  {
    name: "Vibe Email",
    url: "https://superhuman.com/",
    description: "Text to smart email composition",
    category: "Email and Internal Docs",
    tags: ["email", "composition", "smart"]
  },

  // Teaching and Learning
  {
    name: "Vibe Teaching",
    url: "https://vibegrade.com/",
    description: "Teaching and learning platform",
    category: "Teaching and Learning",
    tags: ["teaching", "learning", "education"]
  },

  // Legal
  {
    name: "Vibe Legal Docs",
    url: "https://www.laways.com/",
    description: "Text to simple contracts, NDAs, basic legal docs",
    category: "Legal",
    tags: ["legal", "contracts", "ndas", "documents"]
  },
  {
    name: "Vibe Compliance",
    url: "https://www.dozens.ai/",
    description: "Text to compliance policy drafts and risk checks",
    category: "Legal",
    tags: ["compliance", "policy", "risk", "drafts"]
  },
  {
    name: "Vibe Contract Drafting",
    url: "https://clarilegal.com/",
    description: "Text to contract/data extraction",
    category: "Legal",
    tags: ["contract", "drafting", "data extraction"]
  },

  // Recruiting / HR
  {
    name: "Vibe Recruiting",
    url: "https://ashbyhq.com/",
    description: "Text to job post, candidate outreach, scheduling",
    category: "Recruiting / HR",
    tags: ["recruiting", "job posts", "candidates", "scheduling"]
  },
  {
    name: "Vibe Resume Screening",
    url: "https://pymetrics.com/",
    description: "Text to candidate ranking or matching",
    category: "Recruiting / HR",
    tags: ["resume", "screening", "candidates", "ranking"]
  },
  {
    name: "Vibe Job Descriptions",
    url: "https://harvey.ai/",
    description: "Text to role-specific job descriptions at scale",
    category: "Recruiting / HR",
    tags: ["job descriptions", "roles", "scale"]
  },

  // Finance / Business Analysis
  {
    name: "Vibe Financial Models",
    url: "https://causal.app/",
    description: "Text to dynamic Excel/financial projections",
    category: "Finance / Business Analysis",
    tags: ["financial", "models", "excel", "projections"]
  },
  {
    name: "Vibe Expense Tracking",
    url: "https://www.tryfinta.com/",
    description: "Text to categorized expenses and summaries",
    category: "Finance / Business Analysis",
    tags: ["expense", "tracking", "categorized", "summaries"]
  },

  // Healthcare
  {
    name: "Vibe Patient Notes",
    url: "https://nuclia.com/",
    description: "Text/speech to structured patient records",
    category: "Healthcare",
    tags: ["patient", "notes", "records", "speech"]
  },
  {
    name: "Vibe Healthcare Bots",
    url: "https://hyro.ai/",
    description: "Text to patient Q&A bots and onboarding",
    category: "Healthcare",
    tags: ["healthcare", "bots", "qa", "onboarding"]
  },

  // Real Estate
  {
    name: "Vibe Property Descriptions",
    url: "https://listassist.ai/",
    description: "Text to real estate listing copy",
    category: "Real Estate",
    tags: ["property", "descriptions", "real estate", "listings"]
  },
  {
    name: "Vibe Real Estate Analysis",
    url: "https://enode.com/",
    description: "Text to property valuation and investment reports",
    category: "Real Estate",
    tags: ["real estate", "analysis", "valuation", "investment"]
  },

  // Enterprise / Process Automation
  {
    name: "Vibe RFP Response",
    url: "https://responsive.io/",
    description: "Text to draft proposals and sales documents",
    category: "Enterprise / Process Automation",
    tags: ["rfp", "proposals", "sales", "documents"]
  }
];

export const categories = Array.from(new Set(vibeTools.map(tool => tool.category))).sort(); 