import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SelectionProvider } from "@/context/SelectionContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SelectionTray } from "@/components/SelectionTray";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vertex Lab Studio — Digital products for business development",
  description:
    "Vertex Lab Studio turns business problems into engineered digital solutions — dashboards, ERP, websites, and strategy — built to your brief.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased overflow-x-hidden max-w-full">
        <SelectionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <SelectionTray />
        </SelectionProvider>
      </body>
    </html>
  );
}
