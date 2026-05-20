"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePageNavigate } from "./PageTransition";

type RoleLinkProps = {
  href: string;
  label: string;
};

export default function RoleLink({ href, label }: RoleLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState<"right" | "left">("right");
  const prefersReducedMotion = useReducedMotion();
  const navigate = usePageNavigate();

  const enter = () => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    setOrigin("left");
    setHovered(true);
  };

  const leave = () => {
    setOrigin("right");
    setHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <a
      href={href}
      className="role-link"
      style={{ position: "relative", display: "inline-block", color: "inherit", textDecoration: "none", cursor: "pointer" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={handleClick}
    >
      {label}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
        }
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -2,
          height: 1,
          background: "currentColor",
          transformOrigin: origin,
          display: "block",
        }}
      />
    </a>
  );
}
