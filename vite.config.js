import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173,
  //   open: true,
  //   proxy: {
  //     "/socket.io": {
  //       target: "https://socket-server-ay7s.onrender.com",
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true, // Hỗ trợ WebSocket
  //     },
  //   },
  // },
  // ssr: {
  //   noExternal: ["react-i18next", "i18next"],
  //   external: ['react-dom/server'],

  // },
  // build: {
  //   ssr: "src/entry-server.jsx",
  //   outDir: "dist",
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, "index.html"), // ✅ Fixed here
  //     },
  //   },
  // },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"), // ✅ Fixed here
  //   },
  // },
});
