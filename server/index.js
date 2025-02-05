import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import App from '../src/App';

// ✅ Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, '../dist');

// if (isProd) {
app.use(express.static(distPath));
// } else {
//   const vite = await (await import('vite')).createServer({
//     server: { middlewareMode: 'ssr' },
//     appType: 'custom', // ✅ Avoid Vite's HTML serving behavior
//   });
//   app.use(vite.middlewares);
// }

app.get('*', async (req, res) => {
  try {
    const url = req.originalUrl;
    let template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

    // ✅ For development, get the latest template
    // if (!isProd) {
    //   const vite = await (await import('vite')).createServer({
    //     server: { middlewareMode: 'ssr' },
    //     appType: 'custom',
    //   });
    //   template = await vite.transformIndexHtml(url, template);
    // }

    const appHtml = renderToString(<App />);
    const finalHtml = template.replace(`<!--app-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  } catch (error) {
    console.error('Error during SSR:', error);
    res.status(500).end('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});
