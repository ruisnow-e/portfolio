import Link from "next/link";

export default function FilmPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        Film Director
      </h1>
      <Link
        href="/"
        style={{
          fontSize: 13,
          color: "#777777",
          textDecoration: "none",
          letterSpacing: "0.05em",
        }}
      >
        ← back to home
      </Link>
    </main>
  );
}
