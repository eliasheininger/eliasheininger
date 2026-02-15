export interface FolderItem {
  id: string;
  label: string;
  icon?: string;
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
  externalUrl?: string;
  image?: string;
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
    { id: "work", label: "work", icon: "/folderBlue.svg" },
    { id: "story", label: "life", icon: "/folderGreen.svg" },
    { id: "projects", label: "projects", icon: "/folderOrange.svg" },
    { id: "ideas", label: "ideas", icon: "/folders.svg" },
  ],

  dockItems: [
    // My apps
    { id: "nova", icon: "nova", label: "Nova", type: "link", url: "https://withnova.app" },
    { id: "terminal", icon: "terminal", label: "Terminal", type: "window", windowId: "terminal" },
    // Get in contact
    { id: "email", icon: "gmail", label: "Email", type: "window", windowId: "email" },
    { id: "cal", icon: "cal", label: "Cal", type: "window", windowId: "cal" },
    // My Socials
    { id: "instagram", icon: "instagram", label: "Instagram", type: "window", windowId: "instagram" },
    { id: "x", icon: "x", label: "X", type: "link", url: "https://x.com/eliasheininger" },
    { id: "github", icon: "github", label: "GitHub", type: "link", url: "https://github.com/eliasheininger" },
  ],

  windows: {
    story: {
      title: "Hi I'm Elias",
      type: "text",
      image: "/Elias3.jpg",
      content: `I built and worked on stuff for as long as I can remember.

I started by playing around with microcontrollers such as Arduino at 15 and later working on bikes and engines and whatever I could find.

At 21, I moved to a foreign country, which is where I started my first company and got into building software products.

At 23, I joined a Berlin-based venture studio, working alongside founders behind Jamie AI and Invincible Brands ($400M exit).

During that time, I built various products, including a fact-checking tool called shitcheck.com, which reached 1000s of people within a few weeks.

My last project was an AI second brain organizing people’s thoughts and ideas automatically just by speaking to it. The app’s content reached over 1M views and got more than 2000 downloads.

These days, I am exploring what to do next besides fun projects like this site.
      `,
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
    email: {
      title: "Contact",
      type: "text",
      content: `Get in touch!

Email: elias@eliasheininger.com

I'm always happy to chat about new ideas, collaborations, or just to say hello.

Feel free to reach out anytime.`,
      defaultPosition: { x: 180, y: 100 },
      width: 400,
      height: 300,
    },
    instagram: {
      title: "Instagram",
      type: "embed",
      url: "https://www.instagram.com/eliasheininger/embed",
      externalUrl: "https://instagram.com/eliasheininger",
      defaultPosition: { x: 220, y: 50 },
      width: 500,
      height: 700,
    },
  },

  navItems: ["work", "life", "projects"],
};
