import React, { useEffect, useRef } from "react";

const whispers = [
  "Need help?",
  "Lost something?",
  "I'm here…",
  "Click the lamp",
  "I can help you",
  "Summon me",
  "Tell me what you lost",
  "Don't worry…",
  "Your Genie awaits",
  "Let me assist you",
];

export const GenieWhisperEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const spawnWhisper = () => {
      if (!containerRef.current) return;

      const msg = whispers[Math.floor(Math.random() * whispers.length)];
      const el = document.createElement("div");
      el.className = "genie-whisper";
      el.textContent = msg;
      containerRef.current.appendChild(el);

      el.addEventListener("animationend", () => el.remove());

      const delay = 12000 + Math.random() * 13000;
      timeout = setTimeout(spawnWhisper, delay);
    };

    // First whisper after a short initial delay
    timeout = setTimeout(spawnWhisper, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 160,
        right: 40,
        pointerEvents: "none",
        zIndex: 6,
      }}
    />
  );
};
