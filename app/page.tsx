"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ------------------------------------------------------------
// DATA
// ------------------------------------------------------------

type Category = "cs" | "film" | "dance";
type Filter = "all" | Category;

type Work = {
  num: string;
  title: string;
  category: Category;
  role: string;
  year?: string;
};

const WORKS: Work[] = [
  { num: "01", title: "OmniRAG", category: "cs", role: "Engineer, Research", year: "2026" },
  { num: "02", title: "Jive Compiler", category: "cs", role: "Engineer", year: "2026" },
  { num: "03", title: "Cyber Fish Tank", category: "cs", role: "Engineer, Concept", year: "2025" },
  { num: "04", title: "Heirloom", category: "film", role: "Director, Editor", year: "2024" },
  { num: "05", title: "Reflections of Life", category: "film", role: "Director", year: "2024" },
  { num: "06", title: "Let Me Out", category: "film", role: "Director", year: "2023" },
  { num: "07", title: "SANATORIUM", category: "film", role: "Director, DP", year: "2023" },
  { num: "08", title: "Bulimia", category: "film", role: "Director", year: "2022" },
  { num: "09", title: "Commercial Ads", category: "film", role: "Director", year: "2024" },
  { num: "10", title: "escapism", category: "dance", role: "Choreographer", year: "2025" },
  { num: "11", title: "fxckuptheworld", category: "dance", role: "Choreographer", year: "2025" },
  { num: "12", title: "lvbag", category: "dance", role: "Choreographer", year: "2024" },
  { num: "13", title: "thewayiare", category: "dance", role: "Choreographer", year: "2024" },
  { num: "14", title: "bless", category: "dance", role: "Choreographer", year: "2024" },
];

const TITLES = [
  { label: "Creative AI MLE", anchor: "cs" },
  { label: "Film Director", anchor: "film" },
  { label: "Choreographer", anchor: "dance" },
] as const;

// ------------------------------------------------------------
// PAGE
// ------------------------------------------------------------

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  // Trigger the opening reveal after 1.5s
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // When the user clicks a title in the hero, set the matching filter and scroll
  const jumpToCategory = (cat: Filter) => {
    setFilter(cat);
    const el = document.getElementById("works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const visibleWorks =
    filter === "all" ? WORKS : WORKS.filter((w) => w.category === filter);

  return (
    <main className="bg-ink text-bone">
      <Hero revealed={revealed} onTitleClick={jumpToCategory} />
      <WorkCatalog
        works={visibleWorks}
        filter={filter}
        setFilter={setFilter}
        totalCount={WORKS.length}
      />
      <Footer />
    </main>
  );
}

// ------------------------------------------------------------
// HERO — opening sequence + full-screen video bg + name + titles
// ------------------------------------------------------------

function Hero({
  revealed,
  onTitleClick,
}: {
  revealed: boolean;
  onTitleClick: (cat: Filter) => void;
}) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video background — fades in after opening */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0.45 : 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Dark wash over video for contrast */}
      <div className="absolute inset-0 bg-ink/40 pointer-events-none" />

      {/* TOP NAV */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-8 py-7 text-[13px]"
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: revealed ? 1 : 0,
          y: revealed ? 0 : -8,
        }}
        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
      >
        <a href="#" className="font-medium tracking-tight">
          snow
          <sup className="text-[9px] ml-0.5 opacity-70">®</sup>
        </a>
        <div className="flex items-center gap-8">
          <a href="#works" className="opacity-85 hover:opacity-100 transition">
            Projects
            <sup className="text-[9px] ml-0.5 opacity-60">{WORKS.length}</sup>
          </a>
          <a href="#blog" className="opacity-85 hover:opacity-100 transition">
            Blog
          </a>
          <a href="#contact" className="opacity-85 hover:opacity-100 transition">
            Contact
          </a>
        </div>
      </motion.nav>

      {/* CENTER — Name + titles */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h1
          className="font-display font-medium leading-none m-0"
          initial={{
            fontSize: "30px",
            letterSpacing: "-0.025em",
          }}
          animate={{
            fontSize: revealed ? "clamp(56px, 13vw, 180px)" : "30px",
            letterSpacing: revealed ? "-0.05em" : "-0.025em",
          }}
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          RUI SNOW
          <sup className="text-[0.3em] align-super font-normal opacity-70 ml-1">
            ®
          </sup>
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 uppercase text-[13px] tracking-[0.18em]"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: revealed ? 1 : 0,
            y: revealed ? 0 : 8,
          }}
          transition={{ duration: 1.0, delay: 0.7, ease: "easeOut" }}
        >
          {TITLES.map((t, i) => (
            <span key={t.label} className="flex items-center gap-x-4">
              <button
                onClick={() => onTitleClick(t.anchor as Filter)}
                className="cursor-pointer pb-1 border-b border-transparent hover:border-bone/60 transition-colors duration-300"
              >
                {t.label}
              </button>
              {i < TITLES.length - 1 && (
                <span className="text-bone/30 text-[11px]">/</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM bar — video indicator + scroll hint */}
      <motion.div
        className="absolute bottom-7 left-0 right-0 z-10 flex justify-between items-center px-8 text-[11px] uppercase tracking-[0.12em] font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0.55 : 0 }}
        transition={{ duration: 1.0, delay: 0.9 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-red-500 animate-pulse" />
          <span>Video Loop</span>
        </div>
        <div>Scroll ↓ Selected Works</div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------
// WORK CATALOG — left filter, center scrolling list with bracket framing
// ------------------------------------------------------------

function WorkCatalog({
  works,
  filter,
  setFilter,
  totalCount,
}: {
  works: Work[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  totalCount: number;
}) {
  const [activeNum, setActiveNum] = useState<string>(works[0]?.num ?? "");
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Reset active to the first visible item when the filter changes
  useEffect(() => {
    if (works.length > 0) setActiveNum(works[0].num);
  }, [filter, works]);

  // IntersectionObserver — track which item is in the center band of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let bestNum: string | null = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const num = (entry.target as HTMLElement).dataset.num;
            if (num) {
              bestNum = num;
              bestRatio = entry.intersectionRatio;
            }
          }
        });
        if (bestNum) setActiveNum(bestNum);
      },
      {
        // Center band of viewport (top 35% and bottom 35% are "outside")
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [works]);

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "CS", value: "cs" },
    { label: "Film", value: "film" },
    { label: "Dance", value: "dance" },
  ];

  return (
    <section
      id="works"
      className="relative min-h-screen border-t border-bone/10 py-20 lg:py-28"
    >
      {/* Section header */}
      <header className="px-8 lg:px-12 mb-14 lg:mb-20 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50 mb-3">
            Selected works ({totalCount})
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-medium tracking-tight leading-none">
            Index<span className="opacity-40">.</span>
          </h2>
        </div>
        <p className="max-w-xs text-[13px] leading-relaxed opacity-70">
          A practice shaped by film, choreography, and code. Use the filter to
          browse a single discipline, or scroll through all.
        </p>
      </header>

      {/* Three-column layout: filter | works list | empty (or scroll indicator) */}
      <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-8 px-8 lg:px-12">
        {/* LEFT — filter sidebar (sticky) */}
        <aside className="lg:sticky lg:top-12 self-start">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-40 mb-4">
            Filter
          </div>
          <nav className="flex lg:flex-col gap-x-5 gap-y-2 no-scrollbar overflow-x-auto lg:overflow-visible">
            {filters.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`text-left whitespace-nowrap text-[15px] py-1 transition-colors duration-200 ${
                    active ? "text-bone" : "text-bone/35 hover:text-bone/70"
                  }`}
                >
                  <span className="font-mono text-[10px] mr-2 align-middle opacity-50">
                    {f.value === "all" ? "—" : "·"}
                  </span>
                  {f.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* CENTER — work list */}
        <div className="relative">
          {works.map((work) => {
            const isActive = activeNum === work.num;
            return (
              <div
                key={work.num}
                ref={(el) => {
                  if (el) itemRefs.current.set(work.num, el);
                  else itemRefs.current.delete(work.num);
                }}
                data-num={work.num}
                className="relative py-7 lg:py-10 border-b border-bone/10 group cursor-pointer"
                onClick={() => {
                  /* Hook up navigation to /work/[slug] page later */
                }}
              >
                {/* Brackets — visible only when item is in center band */}
                <motion.span
                  aria-hidden
                  className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 font-display font-medium pointer-events-none select-none"
                  style={{ fontSize: 140, lineHeight: 0.6 }}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -12,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  (
                </motion.span>
                <motion.span
                  aria-hidden
                  className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 font-display font-medium pointer-events-none select-none"
                  style={{ fontSize: 140, lineHeight: 0.6 }}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 12,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  )
                </motion.span>

                {/* Row content */}
                <div className="grid grid-cols-[40px_1fr_auto] lg:grid-cols-[60px_1fr_240px] gap-4 lg:gap-8 items-baseline">
                  <span className="font-mono text-[12px] opacity-40 tracking-[0.08em]">
                    {work.num}
                  </span>
                  <h3 className="font-serif italic text-[26px] lg:text-[34px] leading-tight tracking-tight">
                    <span className="transition-opacity group-hover:opacity-70">
                      {work.title}
                    </span>
                  </h3>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-60 text-left lg:text-right whitespace-normal">
                    <span
                      className={
                        work.category === "cs"
                          ? "text-emerald-300/80"
                          : work.category === "film"
                          ? "text-orange-300/80"
                          : "text-fuchsia-300/80"
                      }
                    >
                      {work.category.toUpperCase()}
                    </span>
                    <span className="opacity-50 mx-1.5">·</span>
                    <span>{work.role}</span>
                    {work.year && (
                      <>
                        <span className="opacity-50 mx-1.5">·</span>
                        <span className="opacity-70">{work.year}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {works.length === 0 && (
            <div className="py-20 text-center opacity-50 text-sm">
              Nothing here yet.
            </div>
          )}
        </div>

        {/* RIGHT — empty column to balance brackets visually */}
        <div className="hidden lg:block" />
      </div>

      {/* View mode toggle row (visual only for v1) */}
      <div className="mt-20 px-8 lg:px-12 flex justify-between items-center text-[11px] font-mono uppercase tracking-[0.12em] opacity-50">
        <div>
          <span className="text-bone underline underline-offset-4">Vertical</span>
          , Horizontal, Grid
        </div>
        <div>
          {filter === "all"
            ? `Showing ${works.length} of ${totalCount}`
            : `Filtered: ${filter.toUpperCase()}`}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// FOOTER
// ------------------------------------------------------------

function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-bone/10 px-8 lg:px-12 py-14 flex flex-wrap items-end justify-between gap-8 text-[12px]"
    >
      <div className="space-y-2">
        <div className="font-mono uppercase tracking-[0.18em] opacity-50">
          Contact
        </div>
        <a
          href="mailto:hello@snowrui.com"
          className="font-serif italic text-2xl hover:opacity-70 transition"
        >
          hello@snowrui.com
        </a>
      </div>
      <div className="font-mono uppercase tracking-[0.18em] opacity-50">
        All rights reserved · © {new Date().getFullYear()} Rui Snow
      </div>
    </footer>
  );
}
