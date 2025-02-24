import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../App.tsx';

const PORT = 9000;
const app = express();
const __dirname = path.resolve();

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (path.endsWith('.svg')) {
      res.set('Content-Type', 'image/svg+xml');
    }
  }
}));

// favicon.icoのリクエストを無視する
app.get('/favicon.ico', (_req, res) => {
  res.status(204).end(); // 204 No Content 応答でアイコンのリクエストを無視
});

app.get('/', (req, res) => {
  // サーバーサイドでReactをレンダリングし、HTMLを生成
  const html = ReactDOMServer.renderToString(React.createElement(App));

  // サーバー側でレンダリングしたHTMLを`index.html`の中に挿入
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/styles.css">
      <title>React SSR Example</title>
    </head>
    <body>
      <div id="root">${html}</div> <!-- サーバーサイドレンダリングされたHTML -->
      <script src="/bundle.js"></script> <!-- クライアントサイド用のバンドルJS -->
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
