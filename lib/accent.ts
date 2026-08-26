import { Accent } from "@/data/services";

export const accentHex: Record<Accent, string> = {
  violet: "#6D4AFF",
  cyanx: "#17C3E6",
  coral: "#FF6B4A",
  lime: "#C6F135",
};

export const accentBorder: Record<Accent, string> = {
  violet: "border-t-violet",
  cyanx: "border-t-cyanx",
  coral: "border-t-coral",
  lime: "border-t-lime",
};

export const accentText: Record<Accent, string> = {
  violet: "text-violet",
  cyanx: "text-[#0B93AE]",
  coral: "text-coral",
  lime: "text-[#7A9A0E]",
};

export const accentBg: Record<Accent, string> = {
  violet: "bg-violet",
  cyanx: "bg-cyanx",
  coral: "bg-coral",
  lime: "bg-lime",
};
