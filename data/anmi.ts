// Anmi — the VLS guide character. Pose assets live in /public/anmi.
// This is the character-asset config described in the spec (Section 17):
// each pose is named, has an image, and a suggested usage context — so
// swapping art later (a new pose, a re-render) never touches component code.

export type AnmiPose =
  | "sitting-calm"
  | "pointing-forward"
  | "thinking-worried"
  | "standing-relaxed"
  | "pointing-up-excited"
  | "thumbs-up-portrait"
  | "thinking-happy"
  | "celebrating"
  | "thinking-casual"
  | "working-laptop"
  | "crouching-calm"
  | "pointing-side-happy"
  | "crouching-confident-hero";

interface AnmiAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Where this pose is intended to be used, per the character-CMS concept. */
  usage: string;
}

export const anmiPoses: Record<AnmiPose, AnmiAsset> = {
  "crouching-confident-hero": {
    src: "/anmi/crouching-confident-hero.png",
    width: 894, height: 900,
    alt: "Anmi crouching confidently, looking off to the side",
    usage: "Homepage hero — the primary, largest render of Anmi",
  },
  "pointing-forward": {
    src: "/anmi/pointing-forward.png",
    width: 287, height: 510,
    alt: "Anmi pointing directly at the viewer",
    usage: "Problem Finder intro — directing attention to the four category cards",
  },
  "thinking-worried": {
    src: "/anmi/thinking-worried.png",
    width: 403, height: 509,
    alt: "Anmi looking thoughtful, slightly concerned",
    usage: "Empty states / \"not sure where to start\" moments",
  },
  "standing-relaxed": {
    src: "/anmi/standing-relaxed.png",
    width: 345, height: 512,
    alt: "Anmi standing relaxed, hands in pockets",
    usage: "About / footer / neutral sections",
  },
  "pointing-up-excited": {
    src: "/anmi/pointing-up-excited.png",
    width: 430, height: 512,
    alt: "Anmi pointing up and to the side, excited",
    usage: "Combos / \"pick a bundle\" section",
  },
  "thumbs-up-portrait": {
    src: "/anmi/thumbs-up-portrait.png",
    width: 483, height: 520,
    alt: "Anmi giving two thumbs up",
    usage: "Success states — after a request or form submits",
  },
  "thinking-happy": {
    src: "/anmi/thinking-happy.png",
    width: 501, height: 533,
    alt: "Anmi thinking, warm smile",
    usage: "How It Works — \"Diagnose\" step",
  },
  "celebrating": {
    src: "/anmi/celebrating.png",
    width: 518, height: 521,
    alt: "Anmi celebrating with both arms up",
    usage: "Request submitted / delivery complete states",
  },
  "thinking-casual": {
    src: "/anmi/thinking-casual.png",
    width: 374, height: 507,
    alt: "Anmi thinking casually, hand on chin",
    usage: "Kidlin's Law section",
  },
  "working-laptop": {
    src: "/anmi/working-laptop.png",
    width: 499, height: 496,
    alt: "Anmi typing on a laptop",
    usage: "How It Works — \"Build\" step, or Services intro",
  },
  "crouching-calm": {
    src: "/anmi/crouching-calm.png",
    width: 401, height: 498,
    alt: "Anmi crouching calmly",
    usage: "Portfolio / case studies empty state",
  },
  "pointing-side-happy": {
    src: "/anmi/pointing-side-happy.png",
    width: 478, height: 499,
    alt: "Anmi pointing to the side, smiling broadly",
    usage: "How It Works — \"Match\" step, directing to next section",
  },
  "sitting-calm": {
    src: "/anmi/sitting-calm.png",
    width: 427, height: 510,
    alt: "Anmi sitting cross-legged, calm",
    usage: "Blog / contact page",
  },
};
