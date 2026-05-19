"use client";

import { useState } from "react";
import RoleLink from "./RoleLink";
import SmokeBackground from "./SmokeBackground";

const INSET_X = "clamp(56px, 10vw, 180px)";
const INSET_Y = "clamp(28px, 4.5vh, 56px)";

const DEFAULTS = {
  brand: "snow",
  trademark: "®",
  roles: [
    { label: "Creative AI MLE", href: "/work/creative-ai" },
    { label: "Film Director", href: "/work/film" },
    { label: "Choreographer", href: "/work/choreography" },
  ],
  tagline: "Film helps me tell stories, CS helps me build new ways to tell them.",
  credentials: "Rui Song · Northeastern University · MS · 2027 ｜ California College of the Arts · MFA · 2025",
  copyright: "© 2026 Snow® Studio",
};

type HeroProps = {
  brand?: string;
  trademark?: string | null;
  roles?: Array<{ label: string; href: string }>;
  tagline?: string;
  credentials?: string;
  copyright?: string;
};

const supStyle: React.CSSProperties = {
  fontSize: "0.3em",
  verticalAlign: "1em",
  fontWeight: 400,
  letterSpacing: 0,
};

const monoFont = "var(--font-mono, 'JetBrains Mono', monospace)";

export default function Hero({
  brand = DEFAULTS.brand,
  trademark = DEFAULTS.trademark,
  roles = DEFAULTS.roles,
  tagline = DEFAULTS.tagline,
  credentials = DEFAULTS.credentials,
  copyright = DEFAULTS.copyright,
}: HeroProps) {
  const [explodeCount, setExplodeCount] = useState(0);
  const triggerExplode = () => setExplodeCount((c) => c + 1);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        color: "#ffffff",
        overflow: "hidden",
        fontFamily: "var(--font-inter, Inter, system-ui, -apple-system, sans-serif)",
        letterSpacing: "-0.015em",
        // transparent — particle layer behind body shows through
      }}
    >
      <SmokeBackground revealed={true} explodeCount={explodeCount} />

      {/* ── MOBILE layout (< 768px) ── */}
      <div
        className="md:hidden flex flex-col"
        style={{ minHeight: "100vh", padding: "28px 24px", gap: 20 }}
      >
        <h1
          onClick={triggerExplode}
          style={{
            fontSize: "clamp(56px, 22vw, 130px)",
            fontWeight: 500,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            margin: 0,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {brand}
          {trademark && <sup style={supStyle}>{trademark}</sup>}
        </h1>

        <ul
          role="list"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: "-0.008em",
            color: "#F5F5F5",
          }}
        >
          {roles.map((r) => (
            <li key={r.href}>
              <RoleLink href={r.href} label={r.label} />
            </li>
          ))}
        </ul>

        <div style={{ flexGrow: 1 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: 15, color: "#DCDCDC", letterSpacing: "-0.005em", lineHeight: 1.5, margin: 0 }}>
            {tagline}
          </p>
          <p style={{ fontFamily: monoFont, fontSize: "clamp(11px, 0.82vw, 13px)", color: "#777777", letterSpacing: "0.04em", lineHeight: 1.5, margin: 0 }}>
            {credentials}
          </p>
        </div>

        <small style={{ fontFamily: monoFont, fontSize: 14, color: "#AAAAAA", letterSpacing: 0 }}>
          {copyright}
        </small>
      </div>

      {/* ── DESKTOP layout (≥ 768px) — four corners ── */}

      {/* Wordmark — right side, vertically centered */}
      <h1
        className="hidden md:block"
        onClick={triggerExplode}
        style={{
          position: "absolute",
          top: "50%",
          right: INSET_X,
          transform: "translateY(-52%)",
          fontSize: "clamp(110px, 24vw, 360px)",
          fontWeight: 500,
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          margin: 0,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {brand}
        {trademark && <sup style={supStyle}>{trademark}</sup>}
      </h1>

      {/* Role titles — upper left */}
      <ul
        role="list"
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "30%",
          left: `calc(${INSET_X} + 5% + 80px)`,
          transform: "translateY(-50%)",
          listStyle: "none",
          padding: 0,
          margin: 0,
          textAlign: "left",
          fontSize: "clamp(18px, 1.7vw, 26px)",
          fontWeight: 400,
          lineHeight: 1.55,
          letterSpacing: "-0.008em",
          color: "#F5F5F5",
        }}
      >
        {roles.map((r) => (
          <li key={r.href}>
            <RoleLink href={r.href} label={r.label} />
          </li>
        ))}
      </ul>

      {/* Bottom-left — tagline + credentials */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: INSET_Y,
          left: INSET_X,
          maxWidth: "min(900px, 72vw)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#DCDCDC", letterSpacing: "-0.005em", lineHeight: 1.5, margin: 0 }}>
          {tagline}
        </p>
        <p style={{ fontFamily: monoFont, fontSize: "clamp(11px, 0.82vw, 13px)", color: "#777777", letterSpacing: "0.04em", lineHeight: 1.5, margin: 0, whiteSpace: "nowrap" }}>
          {credentials}
        </p>
      </div>

      {/* Bottom-right — copyright */}
      <small
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: INSET_Y,
          right: INSET_X,
          fontFamily: monoFont,
          fontSize: 14,
          color: "#AAAAAA",
          letterSpacing: 0,
        }}
      >
        {copyright}
      </small>
    </section>
  );
}
