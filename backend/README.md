# 利用する環境変数について

本 backend 側では以下の環境変数を設定します。
環境変数は原則 heroku cli を install し、 `heroku config:set [ENV_NAME]=[Value]`として設定します

```
ADMIN_PRIVATEKEY<string>
SSS認証のための暗号化・復号用Symbolアカウントの秘密鍵（Symbolのルールに沿っていればOKでネットワークが認識している必要はない）

ADMIN_PUBLICKEY<string>
上の公開鍵

SENDER_PUBLICKEY<string>
報酬の支払いを行うアカウントの公開鍵

BOT_PRIVATEKEY<string>
報酬を送るためのアグボンを生成する際のBot用秘密鍵、誰か一人の署名が必要なため設定している。これをベネアドのマルチシグの一人に設定する。n of m の n が1じゃない限り最悪漏れても良いものでもある

NETWORKTYPE<104|152>
各所で使っているSymbolネットワークタイプ
```

また後述するGithubActionsで使用するSecretは以下です
```
BOT_ID<string>
ActionsよりAPIを操作するためのBOTアカウントID

BOT_PASSWORD<string>
そのパスワード
```

# Symbolアカウントによる管理者について
本システムのサインイン機構はすべてSymbolアカウントを用い、SSS_Extenstionによる認証でサインインとする

## 初期登録時のSuperAdmin
Strapiの初期設定時にSuperAdminとして管理者1名のSymbolアドレスでSSSによる署名を行いサインアップする。
以降は `{domain}/admin/auth/login`にてSSS署名でサインインする

## その他のAdmin
初期SuperAdminは他のSuperAdminを Settings->Administration panel->Userより追加する
Name,SymbolAddressを入力し、RoleはSuperAdminとする

Authorなど、他のRoleも同様でSuperAdminのみが登録する。
すべてのAdminは、 `{domain}/admin/auth/login`にてSSS署名でサインインする

## 構造詳細
Strapiの初期ログイン仕様Emailとパスワードによるログインをカスタム。
登録時はSymbolアドレスをEmailの形に変換（小文字+@mail.com付与）しパスワードはサーバーが返すもので登録。
[setpassword](https://github.com/ymuichiro/symbol-web/blob/main/backend/src/api/sss-auth/controllers/sss-auth.js)

ログイン時は都度、上述したsetpasswordによりパスワードを更新、SSS_ExtenstionのgetActiveAccountTokenを用いて署名することでサーバーから受け取った暗号化されたパスワードを復号し、最暗号化しサーバーに返す。
サーバーではトークンを再度復号し、認証する。ユーザーはパスワードを管理する必要はない。
[loginRequest](https://github.com/ymuichiro/symbol-web/blob/2d1f92aab2203c56dd2267ec1bda3771d141071f/backend/src/admin/ui/pages/AuthPage/index.js#L114)
# 報酬自動支払いシステムについて

## 使用方法
※構造は後述する
### 執筆者向け
1. SuperAdminがContentManager->Reward->[CreatenNew entry]よりRewardの新規作成を行う
2. 必要事項を記入し[Save]する。Roleを[Author]とする。この段階では報酬額や支払先SymbolAddresの設定不要
3. 執筆担当者が決まればSymbolAddressや報酬額などを更新する
4. 執筆者は記事を納品し報告
5. SuperAdminは記事のレビューを行い、問題が無ければ該当Reward内の[Approve an article]を押す。
6. SSSによる署名要求に応える
7. ボタンを押したSuperAdmin以外の連署が行われたら報酬が支払われる<br>
<u>SuperAdminはStrapiのログインアカウントと連署アカウントは同一である必要がある。</u>

### 開発者向け

#### 事前準備
1. SuperAdminは事前にDeveloperの情報をUserとして登録する
2. ContentManager->User->[CreatenNew entry]
3. username, email, password, symbolAddress, githubId,RoleをPublicとし[save]する<br>
<u>username, email, passwordはなんでもいい（RoleがPublicなため）が、この仕様がイケてないのでいずれは不要にするなど対応する</u>

#### 使用方法
1. 委託したい開発があればGithubにて[Task作成テンプレート]を用いたissueの作成
2. issuleタイトルは `future/***` の形式とし、その他詳細や支払いXYMの記載を行う。
3. 担当者が決まれば、issueにアサインする
4. 開発者は該当ブランチをCloneし開発を行う `git clone -b future/*** https://github.com/ymuichiro/symbol-web.git`
5. 開発者は開発が終わればPRを作成し、Developにマージされると支払いトランザクションがアナウンスされる
6. 連署が完了すれば報酬が支払われる

## 構造
### 執筆者向け
AdminUIの[Header](https://github.com/ymuichiro/symbol-web/blob/main/backend/src/admin/ui/content-manager/pages/EditView/Header/index.js)をカスタマイズ。
Rewardの詳細時のみボタン表示。SuperAdmin[Approve an article]をクリックすると[createAggregateTransaction](https://github.com/ymuichiro/symbol-web/blob/2d1f92aab2203c56dd2267ec1bda3771d141071f/backend/src/admin/ui/content-manager/pages/EditView/Header/index.js#L26)により[サーバーはBotの署名付きAggregateTransactionPayload等を返す。](https://github.com/ymuichiro/symbol-web/blob/2d1f92aab2203c56dd2267ec1bda3771d141071f/backend/src/api/auto-reward/controllers/auto-reward.js#L88)
フロントサイドでSSS_Extenstionにより連署者として署名し、再度サーバーサイドに[announceTransaction](https://github.com/ymuichiro/symbol-web/blob/2d1f92aab2203c56dd2267ec1bda3771d141071f/backend/src/admin/ui/content-manager/pages/EditView/Header/index.js#L32)で返す。

サーバーサイドではハッシュロックトランザクションを作成し、[アグリゲートボンデッドとしてアナウンス](https://github.com/ymuichiro/symbol-web/blob/2d1f92aab2203c56dd2267ec1bda3771d141071f/backend/src/api/auto-reward/controllers/auto-reward.js#L126)する。
Botと連署者の署名が入っているため、残りの連署が集まれば報酬支払トランザクションは承認される。

<u>adminUIをカスタマイズする場合、外部ファイルをimportするとエラーが出たためモジュール化していない。おそらく`admin/webpack.config.js`よりcacheをreplaceしており、`@strapi/admin/admin`にはモジュール化されたファイルが存在しないためのエラーと思われるが詳細は不明。</u>

### 開発者向け
主にGithubActionsとStrapiを組み合わせている。

#### - issue作成時

管理者がGihubよりTask作成テンプレートを使用しissueを作成することで、StrapiのRewardテーブルに新規レコードが追加され、同時にブランチが作成される（ブランチ名はissueタイトル。タイトル末に/(スラッシュ)があるとエラーとなる）

[workflow](https://github.com/ymuichiro/symbol-web/blob/main/.github/workflows/issue_opend.yml)<br>
[実行ファイル](https://github.com/ymuichiro/symbol-web/blob/main/actions/issue_opend/index.js)

#### - issueアサイン時

開発担当者が決まり、Github上でアサインすると作成したRewardテーブルのSymbolAddressとGithubIDが更新される。※事前にUserテーブルへ開発者情報の登録が必要<br>
[workflow](https://github.com/ymuichiro/symbol-web/blob/main/.github/workflows/issue_assigned.yml)<br>
[実行ファイル](https://github.com/ymuichiro/symbol-web/blob/main/actions/issue_assigned/index.js)

#### - Task完了時

開発が終わりDevelopブランチへPRを作成。マージされると支払いトランザクションがアナウンスされる。但し、ブランチ名とRewardタイトル名が同じでなければいけない。自動生成されそのブランチをCloneしている場合は同一になる。<br>
[workflow](https://github.com/ymuichiro/symbol-web/blob/main/.github/workflows/task_completed.yml)<br>
[実行ファイル](https://github.com/ymuichiro/symbol-web/blob/main/actions/task_completed/index.js)<br>
[使用API](https://github.com/ymuichiro/symbol-web/blob/2d1f92aab2203c56dd2267ec1bda3771d141071f/backend/src/api/auto-reward/controllers/auto-reward.js#L11)

<u>なお、それぞれの実行ファイルは`@vercel/ncc`によりコンパイルされており実際の実行ファイルは`dist/index.js`となる。</u>


# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
