This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# editorの設定
git config --global core.editor "code --wait"

# set up
node.jsが動く環境

# ドメイン知識

## youtubeのリンクには２種類ある
1. 標準リンク（watch形式）
    例:
    https://www.youtube.com/watch?v=rm3nkawKqW8
    特徴:
    youtube.comドメイン
    クエリパラメータvに動画IDが入っている
    動画ページでよく使われる
2. 短縮リンク（youtu.be形式）
    例:
    https://youtu.be/rm3nkawKqW8
    特徴:
    youtu.beドメイン
    パス部分に動画IDが入っている
    シェア用などで使われる

## YouTubeの動画を埋め込む方法
YouTube IFrame Player API
<iframe>でプレイヤーを表示する