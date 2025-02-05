import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from '../src/App';

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, '../dist');

if (isProd) {
  app.use(express.static(distPath));
} else {
  const vite = await (await import('vite')).createServer({
    server: { middlewareMode: 'ssr' },
  });
  app.use(vite.middlewares);
}

app.get('*', async (req, res) => {
  const url = req.originalUrl;
  const html = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
  const appHtml = renderToString(<App />);
  const finalHtml = html.replace(`<!--app-->`, appHtml);
  res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
