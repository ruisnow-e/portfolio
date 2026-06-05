import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    <html lang="en" className={inter.variable}>
      <body className="bg-ink text-bone antialiased" style={{ fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)" }}>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
