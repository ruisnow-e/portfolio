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

const DESCRIPTION =
  "Creative AI MLE, Film Director, Choreographer. A practice at the intersection of film, choreography, and code.";

export const metadata: Metadata = {
  // Absolute base so link previews (LinkedIn, iMessage, X…) can fetch app/opengraph-image.png
  metadataBase: new URL("https://www.snowsong.studio"),
  title: "SnowStudio",
  description: DESCRIPTION,
  openGraph: {
    title: "Rui Song — snow®",
    description: DESCRIPTION,
    url: "/",
    siteName: "SnowStudio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rui Song — snow®",
    description: DESCRIPTION,
  },
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
