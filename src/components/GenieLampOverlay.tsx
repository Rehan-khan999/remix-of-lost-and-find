import React from "react";

/**
 * GenieLampOverlay - Pure visual overlay with hint text, pulse ring, and glow.
 * Uses pointer-events: none so it never blocks genie/lamp clicks.
 * Positioned fixed bottom-right to align with the lamp.
 */
export const GenieLampOverlay: React.FC = () => {
  return (
    <div
      className="genie-overlay-container"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 5,
        width: "300px",
        height: "300px",
      }}
    >
      {/* Floating hint text */}
      <div className="genie-hint-text">✨ Click the lamp to summon your AI Genie</div>

      {/* Pulse ring behind lamp */}
      <div className="genie-pulse-ring" />

      {/* Soft glow effect */}
      <div className="genie-glow-layer" />
    </div>
  );
};
