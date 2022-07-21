# 概要

Symbolの情報を集約し、新参者や外部が触れる為のサイトを構築します。
記事の更新が中央集権的では維持できない為、CMSを導入し、コミュニティのメンバーが記事の更新を出来る状態までを作ります。

## Backend

CMSとして headless cms の Strapi を利用します。
Strapiで以下のAPIを用意します

- News Release API ... 公的な情報を取り扱いします
- Community Release API ... コミュニティ内のイベントや宣伝を取り扱います
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