import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { PageTransitionProvider } from "./components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnowStudio",
  description:
    "Creative AI MLE, Film Director, Choreographer. A practice at the intersection of film, choreography, and code.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Intro will play: paint white (not the dark home) until the white intro card mounts. Mirrors useShouldPlayIntro. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('rss_intro_played')!=='1')document.documentElement.setAttribute('data-intro','')}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-ink text-bone antialiased" style={{ fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)" }}>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
        <Analytics />
      </body>
    </html>
  );
}
