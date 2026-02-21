import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * GenieLampOverlay - Magical visual attraction system around the genie lamp.
 * Includes sparkles, glow aura, instruction text, hover & click effects.
 * All pointer-events: none — never blocks lamp interaction.
 */

const SPARKLE_COUNT = 20;

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const COLORS = ["#22d3ee", "#67e8f9", "#ffffff"];

function generateSparkles(): Sparkle[] {
  return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 260,
    y: 10 + Math.random() * 200,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export const GenieLampOverlay: React.FC = () => {
  const [sparkles] = useState(generateSparkles);
  const [hovered, setHovered] = useState(false);
  const [clickPulse, setClickPulse] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  // Listen for mousemove over the lamp area (using a transparent hover zone)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = areaRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setHovered(inside);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Listen for clicks in the lamp area
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const rect = areaRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setClickPulse(true);
        setTimeout(() => setClickPulse(false), 700);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={areaRef}
      className="genie-attraction-container"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "300px",
        height: "300px",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* PART 1 — Sparkles */}
      <div className={`genie-sparkles-layer ${hovered ? "genie-sparkles-bright" : ""}`}>
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="genie-sparkle"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: s.color,
              boxShadow: `0 0 ${s.size + 2}px ${s.color}`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* PART 2 — Glow Aura */}
      <div className={`genie-aura ${hovered ? "genie-aura-hover" : ""}`} />

      {/* PART 3 — Instruction Text (removed) */}

      {/* Existing hint text */}
      <div className="genie-hint-text">✨ Click the lamp to summon your AI Genie</div>

      {/* Existing Pulse ring */}
      <div className="genie-pulse-ring" />

      {/* Existing Glow */}
      <div className="genie-glow-layer" />

      {/* PART 5 — Click Pulse */}
      {clickPulse && <div className="genie-click-pulse" />}
    </div>
  );
};
