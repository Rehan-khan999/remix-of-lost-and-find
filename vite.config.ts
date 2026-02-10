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

    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",

      includeAssets: ["favicon.ico"],

      manifest: {
        name: "FindIt - Lost & Found",
        short_name: "FindIt",
        theme_color: "#0ea5e9",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      // ✅ THIS IS THE IMPORTANT FIX
      workbox: {
        // ❌ never precache heavy AI / WASM files
        globIgnores: [
          "**/*.wasm",
          "**/*.onnx",
          "**/*.bin",
        ],

        // keep default safe limit
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
      },
    }),

    mode === "development" ? componentTagger() : null,
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
