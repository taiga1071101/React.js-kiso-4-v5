import path from 'path';
import { fileURLToPath } from 'url';
import webpackNodeExternals from 'webpack-node-externals';  // サーバー側の外部依存を排除
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/server/index.js',  // サーバーサイドのエントリーポイント
  output: {
    filename: 'server.bundle.js',  // サーバー用バンドルファイル
    path: path.resolve(__dirname, 'dist'),
    chunkFormat: "module",
    library: {
      type: 'module',  // モジュール形式でライブラリを出力
    },
    module: true,
  },
  experiments: {
    outputModule: true,  // モジュールとして出力
  },
  target: 'node',  // サーバー用にビルド（Node.js環境）
  externals: [
    webpackNodeExternals({
      importType: 'module', // `import express from 'express'` の形でバンドルする
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,  // TypeScript を ts-loader → Babel の順で処理
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader", // Babel で最新の JavaScript を最適化。React（JSX）変換は babel-loader で行う
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                ['@babel/preset-react', { runtime: 'automatic' }],  // react-jsxではなくreactを使用している可能性があるので、明示的に指定する。
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // CSS を別ファイルに出力
          "css-loader", 
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // 出力される CSS ファイル名
    }),
  ],
};
