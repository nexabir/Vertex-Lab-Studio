import type { Metadata } from "next";
import { SelectionProvider } from "@/context/SelectionContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SelectionTray } from "@/components/SelectionTray";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertex Lab Studio — Digital products for business development",
  description:
    "Vertex Lab Studio turns business problems into engineered digital solutions — dashboards, ERP, websites, and strategy — built to your brief.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`:root { --font-display: 'Space Grotesk', sans-serif; --font-body: 'Inter', sans-serif; }`}</style>
      </head>
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
