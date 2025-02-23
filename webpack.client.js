import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/client/index.tsx', // クライアントサイドのエントリーポイント
  output: {
    filename: 'bundle.js',  // クライアント用バンドルファイル
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,  // 任意のポート番号
    open: true,  // ブラウザを自動で開く
  },
  target: 'web',  // ブラウザ用にビルド
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // 出力される CSS ファイル名
    }),
  ],
};