import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../api/public', // 将构建输出目录指向后端的 public 目录
  },
  server: {
    port: 3000,
  },
  base: './', // 确保资源路径正确
});
