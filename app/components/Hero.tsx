"use client";

import { useState } from "react";
import RoleLink from "./RoleLink";
import SmokeBackground from "./SmokeBackground";

const INSET_X = "clamp(56px, 10vw, 180px)";
const INSET_Y = "clamp(28px, 4.5vh, 56px)";
const EDGE_X = "clamp(20px, 2.5vw, 36px)";
const EDGE_Y = "clamp(14px, 1.8vh, 22px)";

const DEFAULTS = {
  brand: "snow",
  trademark: "®",
  roles: [
    { label: "Engineer", href: "/work/cs" },
    { label: "Film Director", href: "/work/film" },
    { label: "Choreographer", href: "/work/dance" },
  ],
  tagline: "Film helps me tell stories, CS helps me build new ways to tell them.",
  credentials: "Northeastern University · MS · 2027 ｜ California College of the Arts · MFA · 2025\nRui Song",
  copyright: "",
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

const monoFont = "var(--font-inter, Inter, system-ui, sans-serif)";

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
  const [degreeLine, nameLine] = credentials.split('\n');

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
        {/* Mobile top nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: monoFont, fontSize: 15, letterSpacing: "0.08em" }}>
          <RoleLink href="/bio" label="Bio" />
          <RoleLink href="/award" label="Award" />
          <RoleLink href="/contact" label="Contact" />
        </div>

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
          <p style={{ fontFamily: monoFont, fontSize: "clamp(11px, 0.82vw, 13px)", color: "#777777", letterSpacing: "0.04em", lineHeight: 1.5, margin: 0, whiteSpace: "pre-line" }}>
            {credentials}
          </p>
        </div>

        {copyright && (
          <small style={{ fontFamily: monoFont, fontSize: 14, color: "#AAAAAA", letterSpacing: 0 }}>
            {copyright}
          </small>
        )}
      </div>

      {/* ── DESKTOP layout (≥ 768px) — four corners ── */}

      {/* Top nav — bio (left), award (center), contact (right) */}
      <nav
        className="hidden md:block"
        style={{ position: "absolute", top: EDGE_Y, left: 0, right: 0, pointerEvents: "none" }}
      >
        <span style={{ position: "absolute", left: EDGE_X, pointerEvents: "auto", fontFamily: monoFont, fontSize: "clamp(13px, 1vw, 15px)", letterSpacing: "0.08em" }}>
          <RoleLink href="/bio" label="Bio" />
        </span>
        <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", pointerEvents: "auto", fontFamily: monoFont, fontSize: "clamp(13px, 1vw, 15px)", letterSpacing: "0.08em" }}>
          <RoleLink href="/award" label="Award" />
        </span>
        <span style={{ position: "absolute", right: EDGE_X, pointerEvents: "auto", fontFamily: monoFont, fontSize: "clamp(13px, 1vw, 15px)", letterSpacing: "0.08em" }}>
          <RoleLink href="/contact" label="Contact" />
        </span>
      </nav>

      {/* Wordmark — right side, vertically centered */}
      <h1
        className="hidden md:block"
        onClick={triggerExplode}
        style={{
          position: "absolute",
          top: "50%",
          right: INSET_X,
          transform: "translateY(calc(-52% - 30px))",
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

      {/* Bottom-left corner — university vertical (CCW) + Rui Song horizontal forming └ */}
      <p
        className="hidden md:block"
        style={{
          position: "absolute",
          left: "clamp(8px, 1.2vw, 20px)",
          bottom: "calc(clamp(8px, 1.5vh, 20px) + 10px)",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          whiteSpace: "nowrap",
          fontFamily: monoFont,
          fontSize: "clamp(10px, 0.75vw, 12px)",
          color: "#777777",
          letterSpacing: "0.06em",
          margin: 0,
        }}
      >
        {degreeLine}
      </p>
      <p
        className="hidden md:block"
        style={{
          position: "absolute",
          left: "clamp(36px, 4vw, 52px)",
          bottom: "clamp(8px, 1.5vh, 20px)",
          fontFamily: monoFont,
          fontSize: "clamp(10px, 0.75vw, 12px)",
          color: "#777777",
          letterSpacing: "0.04em",
          margin: 0,
        }}
      >
        {nameLine}
      </p>


      {/* Bottom-right — tagline */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: INSET_Y,
          right: EDGE_X,
          textAlign: "right",
        }}
      >
        <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#DCDCDC", letterSpacing: "-0.005em", lineHeight: 1.5, margin: 0, whiteSpace: "nowrap", transform: "translate(-100px, -190px)" }}>
          {tagline}
        </p>
      </div>

      {/* Bottom-right — copyright */}
      {copyright && (
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
      )}
    </section>
  );
}
