export interface FolderItem {
  id: string;
  label: string;
}

export interface DockItem {
  id: string;
  icon: string;
  label?: string;
  type: "window" | "link";
  windowId?: string;
  url?: string;
}

export interface WindowConfig {
  title: string;
  type: "text" | "embed";
  content?: string;
  url?: string;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
}

export interface SiteData {
  name: string;
  tagline: string;
  location: string;
  temperature: string;
  currentFocus: string;
  folders: FolderItem[];
  dockItems: DockItem[];
  windows: Record<string, WindowConfig>;
  navItems: string[];
}

export const siteData: SiteData = {
  name: "Elias Heininger",
  tagline: "Designer/Founder/Engineer/Thinker",
  location: "Berlin, Germany",
  temperature: "8°",
  currentFocus: "Travel/Tinkering",

  folders: [
    { id: "work", label: "work" },
    { id: "life", label: "life" },
    { id: "projects", label: "projects" },
    { id: "ideas", label: "ideas" },
  ],

  dockItems: [
    // My apps
    { id: "nova", icon: "nova", label: "Nova", type: "link", url: "https://withnova.app" },
    { id: "terminal", icon: "terminal", label: "Terminal", type: "window", windowId: "terminal" },
    // Get in contact
    { id: "email", icon: "gmail", label: "Email", type: "link", url: "mailto:elias@eliasheininger.com" },
    { id: "cal", icon: "cal", label: "Cal", type: "window", windowId: "cal" },
    // My Socials
    { id: "instagram", icon: "instagram", label: "Instagram", type: "link", url: "https://instagram.com/eliasheininger" },
    { id: "x", icon: "x", label: "X", type: "link", url: "https://x.com/eliasheininger" },
    { id: "github", icon: "github", label: "GitHub", type: "link", url: "https://github.com/eliasheininger" },
  ],

  windows: {
    story: {
      title: "My Story",
      type: "text",
      content: `I grew up in a small town in Bavaria, Germany. From an early age, I was fascinated by technology and design - always tinkering with computers, building things, and dreaming up new ideas.

I recently joined Acta, a venture studio in Berlin, where I'm building, creating content and growing as a founder alongside amazing people.

Currently I'm building an AI Agent to help infrastructure developers find and analyze the best plots for their projects based on GIS Data.

Before that, I started a Design and Software development Agency in Bangkok, Thailand. I've built tools like ShitCheck (an AI fact checker), FindPapersFast, and various other projects exploring the intersection of AI and practical problem-solving.

I believe in building things that matter, learning by doing, and staying curious about everything.`,
      defaultPosition: { x: 120, y: 80 },
    },
    work: {
      title: "Work",
      type: "text",
      content: `Currently at Acta, a venture studio in Berlin, building AI-powered tools and growing as a founder.

Past work:
- Design and Software development Agency in Bangkok, Thailand
- Built ShitCheck - AI fact checker used by thousands
- Built FindPapersFast & ReadPapersFast - AI tools for researchers
- Various SaaS experiments in events, food delivery, and more`,
      defaultPosition: { x: 150, y: 100 },
    },
    life: {
      title: "Life",
      type: "text",
      content: `Based in Berlin, Germany.

I love exploring new places, meeting interesting people, and constantly learning new things.

When I'm not coding or designing, you'll find me reading, traveling, or having deep conversations about ideas that matter.`,
      defaultPosition: { x: 180, y: 120 },
    },
    projects: {
      title: "Projects",
      type: "text",
      content: `Current:
- AI Agent for GIS analysis and plot finding for infrastructure developers

Past:
- ShitCheck - AI fact checker against misinformation
- FindPapersFast - AI tool to find relevant research papers
- ReadPapersFast - Making scientific research more accessible
- Design Agency in Bangkok
- Event SaaS platform
- Grocery delivery integration for recipes`,
      defaultPosition: { x: 200, y: 90 },
    },
    ideas: {
      title: "Ideas",
      type: "text",
      content: `Things I'm thinking about:

- AI sims game: Interactive game with AI characters making decisions
- Intimate chat messenger with AI mediator for couples
- 'Alt text' device for blind navigation
- Phone AI IDE to vibe-code on the go
- AI companion for the elderly`,
      defaultPosition: { x: 160, y: 110 },
    },
    cal: {
      title: "Cal.com",
      type: "embed",
      url: "https://cal.com/eliasheiningerr?embed=true&theme=light",
      defaultPosition: { x: 200, y: 60 },
      width: 700,
      height: 500,
    },
  },

  navItems: ["work", "life", "projects"],
};
