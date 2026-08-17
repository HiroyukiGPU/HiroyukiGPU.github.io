# Hiroyuki Portfolio

Next.js / TypeScript / Tailwind CSSで構築した、JSON駆動のポートフォリオです。プロジェクト情報は`src/projects`以下から自動探索されます。

## 開発

```bash
npm install
npm run dev
```

## GitHub Pagesへの公開

`main`ブランチへpushするとGitHub Actionsが静的サイトをビルドし、GitHub Pagesへ自動デプロイします。`npm run build`は、各プロジェクトフォルダの画像・動画を静的配信用に自動同期してから`out`を生成します。

## 新しいプロジェクトを追加する方法

Reactコードや中央の一覧ファイルを変更する必要はありません。

1. `src/projects`内に、slugと同名のフォルダを作ります。
2. フォルダ内に`project.json`を作ります。
3. `cover.png`やスクリーンショットを同じフォルダへ入れます。

```text
src/projects/new-project/
├── project.json
├── cover.png
└── screenshot.png
```

最小構成：

```json
{
  "slug": "new-project",
  "title": "New Project",
  "shortDescription": "一覧に表示する短い説明",
  "description": "詳細ページ冒頭に表示する説明",
  "status": "released",
  "date": "2026-08-17",
  "featured": false,
  "category": "Web",
  "thumbnail": "./cover.png",
  "tech": ["React", "TypeScript"],
  "links": { "website": "", "github": "" },
  "sections": []
}
```

`slug`は小文字英数字とハイフンを使用し、フォルダ名と一致させてください。画像と動画は`project.json`からの相対パスで指定できます。例：`"image": "./screenshot.png"`。

### 利用できるSection

- `hero` — 導入ビジュアル
- `text` — 見出しと本文
- `image` — 標準画像
- `largeImage` — 大型画像
- `textImage` — テキストと画像の2カラム
- `gallery` — 複数画像
- `video` — 動画と任意のposter
- `features` — 機能一覧
- `techStack` — 技術と用途
- `metrics` — 数値・成果
- `links` — 外部リンク
- `story` — Problem / Idea / Implementation / Result

全コンポーネントの記述例は[`src/projects/example/project.json`](src/projects/example/project.json)を参照してください。

不正な`project.json`はサイト全体を停止させず、そのプロジェクトだけを除外します。不明または不正なSectionは開発環境では該当位置に警告を表示し、本番環境では省略します。検証スキーマは`src/lib/project-schema.ts`、Component Registryは`src/components/project-sections/registry.tsx`にあります。
