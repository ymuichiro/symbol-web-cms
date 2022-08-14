# 概要

Symbol の情報を集約し、新参者や外部が触れる為のサイトを構築します。
記事の更新が中央集権的では維持できない為、CMS を導入し、コミュニティのメンバーが記事の更新を出来る状態までを作ります。

## 構成

### ビルド/デプロイについて

フロントエンドは Next.js を SSG したものを Github Pages に展開しています。フロントエンドのビルドは main ブランチにソースコードを公開することで Github Actions が自動で起動し、Github Pages へデプロイされます。バックエンドのビルドは main ブランチに公開する事で heroku 側にて自動的にビルドされます。heroku 側より main ブランチを監視しているため、自動ビルド&デプロイを中止する為には Heroku 側の管理コンソールにログインする必要があります。

### HTML の修正方法について

Github Pages はフロントエンドとして静的な HTML を返します。HTML より Strapi の API へアクセスし、参照したい記事情報を取得しています。Github Pages の HTML を修正したい場合は本レポジトリのソースコード修正を、各記事の修正を行いたい場合は Strapi の管理コンソールへアクセスし、記事の修正を行うか、記事が格納されている Heroku 上の PostgreSQL へアクセスを試みて下さい。

### 多言語対応について

Strapi/Next.js とも plugin の i18n を使用しています。

## ドメインについて

現在 Github Pages に適用された domain は [ふぁー](https://twitter.com/faunsu19000/photo) にて保有しています。
ドメインの移管が必要となる際には話し合いの上対応を行うものとします。

## 本プロジェクトへの協力について

プログラマ、デザイナ、アイディア出し、広報、他ハーベストによる資金提供等、如何なる協力も歓迎致します。
Symbol の盛り上げに向けて何か協力したいと思って頂けた場合は、[ふぁー](https://twitter.com/faunsu19000/photo)までご連絡下さい。
また [Discord](https://discord.com/channels/856325968096133191/999479496845561946) で本件のディスカッションを行なっています。

## Design

Figma にてドラフトを作成
https://www.figma.com/file/yQ4fCXp5obc6VEIeWrZsGw/Symbol?node-id=2%3A6

## Architecture

以下の通り（Heroku は無料プラン内での利用を想定）
https://drive.google.com/file/d/1QyNH4YZ6i5VzqRCJkSkDgM0JjYMy0C2c/view?usp=sharing
※ ドメインは今後要検討。SEO 的にないと厳しそうであればハーベスト報酬より購入する

課題
Heroku で複数ポートを開けるにはどうしたら良いか
開けられない場合の代案

- Nextjs を ssg として ビルドし、Strapi 下に置いてみる
- Nextjs を ssg として ビルドし、Github Pages に置いてみる

## Branch Strategy

各自作業を行う際には future/{作業名} にて行って下さい

| main       | develop         | future/{作業名} |
| ---------- | --------------- | --------------- |
| リリース用 | future マージ用 | 各自作業用      |

### git 周りのやり方

レポジトリを自身の PC へ同期して下さい

```
git clone https://github.com/ymuichiro/symbol-web.git
```

作業用ブランチを切って下さい

```
git checkout -b future/{作業名}
```

例）

```
git branch -b future/create-top-page
```

作業が終わったら develop ブランチへ プルリクエストを送って下さい
リクエスト作成手順は次のとおりです

[プルリクエストの作成方法](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

マージを行ったタイミングで該当の future ブランチは削除します

[ブランチの削除](https://docs.github.com/ja/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/deleting-and-restoring-branches-in-a-pull-request)

develop ブランチに変更が反映されたら 一度 PC 側と Github 側を同期して下さい
新しい作業開始時にはそのまま新しいブランチを作成します

```
git checkout develop
git pull
git checkout -b future/{作業名}
```

※ git が conflict した時にはメンバーに相談して下さい
branch name is future/action-test

branch name is future/test1

branch name is future/test2

