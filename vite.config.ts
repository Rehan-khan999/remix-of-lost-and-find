import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" ? componentTagger() : null,
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        globIgnores: ["**/*.wasm", "**/*.onnx", "**/*.bin"],
        maximumFileSizeToCacheInBytes: 1500000,
      },
      manifest: {
        name: "FindIt - Lost & Found",
        short_name: "FindIt",
        theme_color: "#0891b2",
        background_color: "#f8fafc",
        display: "standalone",
        icons: [
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
    dedupe: ["react", "react-dom"],
  },
}));
