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
    name: 'Vibe Marketing',
    url: 'https://www.outnurture.com',
    description: 'Text to marketing campaigns/workflows and sales pipelines',
    category: 'Marketing, Outreach, and Branding',
    tags: ['marketing', 'campaigns', 'workflows', 'sales', 'pipelines'],
  },
  {
    name: 'Vibe Influencer Marketing',
    url: 'https://www.stormy.ai/',
    description: 'AI-powered influencer search and analysis',
    category: 'Marketing, Outreach, and Branding',
    tags: ['influencer', 'analysis', 'search', 'ai'],
  },
  {
    name: 'Vibe Advertising',
    url: 'https://www.omneky.com/',
    description: 'Text to multichannel ad creatives',
    category: 'Marketing, Outreach, and Branding',
    tags: ['advertising', 'creatives', 'multichannel'],
  },
  {
    name: 'Vibe Branding',
    url: 'https://www.looka.com/',
    description: 'Text to logo/brand kit generation',
    category: 'Marketing, Outreach, and Branding',
    tags: ['branding', 'logo', 'brand kit', 'generation'],
  },
  {
    name: 'Vibe Visual Ad Generation',
    url: 'https://adcreative.ai/',
    description: 'Text to product ads for ecommerce',
    category: 'Marketing, Outreach, and Branding',
    tags: ['visual', 'ads', 'ecommerce', 'product'],
  },
  {
    name: 'Vibe Content Strategy',
    url: 'https://www.digitalfirst.ai/',
    description: 'Text to blog and social post calendars',
    category: 'Marketing, Outreach, and Branding',
    tags: ['content', 'strategy', 'blog', 'social', 'calendar'],
  },
  {
    name: 'Vibe Social Media',
    url: 'https://buffer.com/ai-assistant/',
    description: 'Text to social media posts & scheduling',
    category: 'Marketing, Outreach, and Branding',
    tags: ['social media', 'posts', 'scheduling'],
  },

  // Design, Product, and Prototyping
  {
    name: 'Vibe Design',
    url: 'https://uizard.io/',
    description: 'Text to app UI/design mockups',
    category: 'Design, Product, and Prototyping',
    tags: ['design', 'ui', 'mockups', 'app', 'ux'],
  },
  {
    name: 'Vibe Product Design',
    url: 'https://stitch.withgoogle.com/',
    description: 'Text to product/app prototypes',
    category: 'Design, Product, and Prototyping',
    tags: ['product', 'prototypes', 'app'],
  },

  // Video, Audio, and Content Creation
  {
    name: 'Vibe Video',
    url: 'https://runwayml.com/',
    description: 'Text to video generation/effects',
    category: 'Video, Audio, and Content Creation',
    tags: ['video', 'generation', 'effects'],
  },
  {
    name: 'Vibe Animation',
    url: 'https://pika.art/',
    description: 'Text to animated scenes',
    category: 'Video, Audio, and Content Creation',
    tags: ['animation', 'scenes'],
  },
  {
    name: 'Vibe Audio',
    url: 'https://www.elevenlabs.io/',
    description: 'Text to voice cloning/audio editing',
    category: 'Video, Audio, and Content Creation',
    tags: ['audio', 'voice', 'cloning', 'editing'],
  },
  {
    name: 'Vibe Audio Storytelling',
    url: 'https://podcastle.ai/',
    description: 'Text to podcast or voiceover production',
    category: 'Video, Audio, and Content Creation',
    tags: ['audio', 'storytelling', 'podcast', 'voiceover'],
  },
  {
    name: 'Vibe Presentation Design',
    url: 'https://gamma.app/',
    description: 'Text to beautiful, interactive presentations',
    category: 'Video, Audio, and Content Creation',
    tags: ['presentation', 'design', 'interactive'],
  },

  // Copywriting, Communication, and Research
  {
    name: 'Vibe Copywriting',
    url: 'https://jasper.ai/',
    description: 'Text to blog/social/email copy',
    category: 'Copywriting, Communication, and Research',
    tags: ['copywriting', 'blog', 'social', 'email', 'copy'],
  },
  {
    name: 'Vibe Research',
    url: 'https://elicit.com/',
    description: 'Text to structured research/summaries',
    category: 'Copywriting, Communication, and Research',
    tags: ['research', 'structured', 'summaries'],
  },

  // Web and App Development
  {
    name: 'Vibe App',
    url: 'https://lovable.so/',
    description: 'Text to mobile/web app',
    category: 'Design, Product, and Prototyping',
    tags: ['app', 'mobile', 'web'],
  },
  {
    name: 'Vibe Website Creation',
    url: 'https://durable.co/',
    description: 'Text to rapid website creation',
    category: 'Web and App Development',
    tags: ['website', 'creation', 'rapid'],
  },
  {
    name: 'Vibe Coding (backend)',
    url: 'https://vibeflow.ai/',
    description: 'Backend coding assistance',
    category: 'Web and App Development',
    tags: ['coding', 'backend', 'development'],
  },
  {
    name: 'Vibe Engineering',
    url: 'https://adam.new/',
    description: 'Text to CAD or 3D designs',
    category: 'Web and App Development',
    tags: ['engineering', 'cad', '3d', 'design'],
  },
  {
    name: 'Vibe Video Game Creation',
    url: 'http://rosebud.ai/',
    description: 'Video game creation tools',
    category: 'Web and App Development',
    tags: ['video games', 'creation', 'gaming'],
  },

  // Agents, Automation, and Support
  {
    name: 'Vibe AI Agent Creation',
    url: 'https://okibi.ai/',
    description: 'AI agent creation platform',
    category: 'Agents, Automation, and Support',
    tags: ['ai', 'agents', 'creation'],
  },
  {
    name: 'Vibe Customer Support Agent',
    url: 'https://fin.ai/',
    description: 'Chatbot/AI agent builder',
    category: 'Agents, Automation, and Support',
    tags: ['customer support', 'chatbot', 'ai agent'],
  },
  {
    name: 'Vibe Workflow Automation',
    url: 'https://lindy.ai/',
    description: 'Text to CRM workflows and task automations',
    category: 'Agents, Automation, and Support',
    tags: ['workflow', 'automation', 'crm', 'tasks'],
  },

  // Analytics and Reporting
  {
    name: 'Vibe Data Analysis',
    url: 'https://akkio.com/',
    description: 'Text to analytics/dashboards',
    category: 'Analytics and Reporting',
    tags: ['data', 'analysis', 'analytics', 'dashboards', 'media agencies'],
  },

  // Email and Internal Docs
  {
    name: 'Vibe Email',
    url: 'https://superhuman.com/',
    description: 'Text to smart email composition',
    category: 'Email and Internal Docs',
    tags: ['email', 'composition', 'smart'],
  },

  // Teaching and Learning
  {
    name: 'Vibe Teaching',
    url: 'https://vibegrade.com/',
    description: 'Teaching and learning platform',
    category: 'Teaching and Learning',
    tags: ['teaching', 'learning', 'education'],
  },

  // Legal TODO

  // Recruiting / HR
  {
    name: 'Vibe Recruiting',
    url: 'https://ashbyhq.com/',
    description: 'Text to job post, candidate outreach, scheduling',
    category: 'Recruiting / HR',
    tags: ['recruiting', 'job posts', 'candidates', 'scheduling'],
  },

  // Finance / Business Analysis

  // Healthcare

  // Real Estate
];

export const categories = Array.from(
  new Set(vibeTools.map((tool) => tool.category))
).sort();
