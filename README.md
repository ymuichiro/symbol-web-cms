# 概要

Symbolの情報を集約し、新参者や外部が触れる為のサイトを構築します。
記事の更新が中央集権的では維持できない為、CMSを導入し、コミュニティのメンバーが記事の更新を出来る状態までを作ります。

## Backend

CMSとして headless cms の Strapi を利用します。
Strapiで以下のAPIを用意します

- News Release API ... 公的な情報を取り扱いします
- Community Release API ... コミュニティ内のイベントや宣伝を取り扱います
- Documents API ... ウォレットインストール方法等資料を取り扱います。
- Login API ... 執筆者がログイン出来る状態にします。（出来れば Symbol の秘密鍵でログインしたい ※ SSSExtention）

## Frontend

Next.jsとMui-materialを用います。IconSetはMui-material/iconを用います

## 本プロジェクトへの協力について

プログラマ、デザイナ、アイディア出し、広報、他ハーベストによる資金提供等、如何なる協力も歓迎致します。
Symbolの盛り上げに向けて何か協力したいと思って頂けた場合は、[ふぁー](https://twitter.com/faunsu19000/photo)までご連絡下さい。
また [Discord](https://discord.com/channels/856325968096133191/999479496845561946) で本件のディスカッションを行なっています。

## Design

Figmaにてドラフトを作成
https://www.figma.com/file/yQ4fCXp5obc6VEIeWrZsGw/Symbol?node-id=2%3A6

## Architecture

以下の通り（Herokuは無料プラン内での利用を想定）
https://drive.google.com/file/d/1QyNH4YZ6i5VzqRCJkSkDgM0JjYMy0C2c/view?usp=sharing
※ ドメインは今後要検討。SEO的にないと厳しそうであればハーベスト報酬より購入する

## Branch Strategy

各自作業を行う際には future/{作業名} にて行って下さい

| main       | develop        | future/{作業名} |
| ---------- | -------------- | --------------- |
| リリース用 | futureマージ用 | 各自作業用      |

### git 周りのやり方

レポジトリを自身のPCへ同期して下さい

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

develop ブランチに変更が反映されたら 一度PC側とGithub 側を同期して下さい
新しい作業開始時にはそのまま新しいブランチを作成します

```
git checkout develop
git pull
git checkout -b future/{作業名}
```

※ git が conflict した時にはメンバーに相談して下さい