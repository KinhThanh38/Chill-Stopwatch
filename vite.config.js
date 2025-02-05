import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/socket.io": {
        target: "https://socket-server-ay7s.onrender.com",
        changeOrigin: true,
        secure: false,
        ws: true, // Hỗ trợ WebSocket
      },
    },
  },
  ssr: {
    // Xử lý các gói không tương thích với SSR
    noExternal: ["react-i18next", "i18next"],
  },
  build: {
    ssr: "src/entry-server.jsx", // Đầu vào cho SSR
    outDir: "dist",              // Thư mục build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // File HTML chính
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias cho import dễ dàng hơn
    },
  },
});
