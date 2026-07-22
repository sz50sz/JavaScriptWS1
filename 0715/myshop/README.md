# ECsite_base

このリポジトリは **Template Repository** として利用するための、React製ECアプリの雛形です。  
新しくECアプリを作成する際は、このテンプレートからリポジトリを生成して利用してください。

## 使い方（テンプレートから作成）

1. GitHub上でこのリポジトリを開く
2. **Use this template** をクリック
3. 新しいリポジトリ名・公開設定を選択して作成
4. 作成したリポジトリをローカルに clone して開発開始

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:5173` にサンプルデータのままの一覧が表示されれば準備完了です。

## ディレクトリ構成

```
myitems-skeleton/
├── public/
│   ├── items.json        ← 差し替え対象
│   └── images/           ← 写真を配置
├── src/
│   ├── App.jsx           ← BrowserRouter + Routes
│   ├── main.jsx          ← Reactエントリ
│   ├── index.css         ← CSS変数＋グローバルスタイル
│   ├── components/
│   │   ├── Header.jsx    ← ロゴ・ナビ・カートアイコン
│   │   ├── Footer.jsx    ← SNSリンク・copyright
│   │   └── ItemCard.jsx  ← 1アイテムの見た目
│   └── pages/
│       ├── Home.jsx      ← 一覧＋「more」ボタン
│       ├── About.jsx     ← ショップ紹介の雛形
│       ├── Favorites.jsx ← 空（次回実装）
│       └── Cart.jsx      ← 空（次回実装）
├── package.json
└── vite.config.js
```

## items.json のスキーマ

| キー | 型 | 内容 |
| --- | --- | --- |
| `id` | string | 一意なID（`"001"` から連番） |
| `name` | string | 商品名 |
| `image` | string | `/images/item-XX.jpg` のパス |
| `price` | number | 価格（円） |
| `category` | string | カテゴリ |
| `description` | string | 一言説明 |
| `status` | string | `"onsale"` または `"soldout"` |
| `code` | string | 品番（`"MS-001"` のように自由な形式でOK） |
| `color` | string | カラー（色のないモノは素材感などでOK） |
| `size` | string | サイズ（服・靴はS/M/Lやcm、モノは寸法・容量） |

## カスタマイズポイント

- `src/index.css` の `:root` にあるCSS変数（色・フォント・幅）
- `src/components/Header.jsx` のショップ名（`Myshop` を書き換え）
- `src/components/Footer.jsx` のSNSリンク先
