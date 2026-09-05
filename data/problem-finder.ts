export const problemFinderCategories = [
  {
    category: "Insights",
    accent: "#17C3E6",
    accentBg: "rgba(23,195,230,0.1)",
    quote: "I can't see what my business data is telling me.",
    services: ["Business Dashboards", "Business Analysis"],
  },
  {
    category: "Presence",
    accent: "#FF6B4A",
    accentBg: "rgba(255,107,74,0.1)",
    quote: "My business doesn't look as strong as it should.",
    services: ["Presentations", "Websites"],
  },
  {
    category: "Strategy",
    accent: "#6D4AFF",
    accentBg: "rgba(109,74,255,0.1)",
    quote: "I know something needs to change, but I don't know what.",
    services: ["Business Consultancy", "Marketing & Sales Strategy", "Business Documents"],
  },
  {
    category: "Systems",
    accent: "#7A9A0E",
    accentBg: "rgba(198,241,53,0.18)",
    quote: "Too much work is happening manually.",
    services: ["ERP Development", "Business Apps"],
  },
];

export const howItWorksSteps = [
  { n: "01", title: "Define", desc: "Tell us what's happening.", accent: "#6D4AFF", pose: "thinking-worried" as const },
  { n: "02", title: "Diagnose", desc: "We understand what's actually causing the problem.", accent: "#17C3E6", pose: "thinking-happy" as const },
  { n: "03", title: "Match", desc: "We identify the right service or combination of services.", accent: "#FF6B4A", pose: "pointing-side-happy" as const },
  { n: "04", title: "Build", desc: "We work toward the solution.", accent: "#7A9A0E", pose: "working-laptop" as const },
];
