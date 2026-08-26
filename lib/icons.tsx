import {
  Presentation,
  LayoutDashboard,
  Globe,
  Compass,
  TrendingUp,
  FileText,
  BarChart3,
  Boxes,
  AppWindow,
  LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Presentation,
  LayoutDashboard,
  Globe,
  Compass,
  TrendingUp,
  FileText,
  BarChart3,
  Boxes,
  AppWindow,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Globe;
}
