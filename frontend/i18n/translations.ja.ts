// prettier-ignore
export const ja = {
  index: {
    title_message: 'Welcome to Symbol & NEM. It is easy to install and anyone, anytime, can carve blocks under the L1 chain.',
    history_title1: 'NEMに新たな思想を吹き込んだパブリックブロックチェーン',
    history_body1: '2014年に登場したNEMに対して、性能向上・機能強化・コンセンサスアルゴリズムの改良を目的として、「Catapult」というコードネームで開発が行われていました。これが完成し Catapult を搭載して2021年にリリースされたパブリックブロックチェーンが「Symbol」です。',
    history_body1_Button: "NEM とは？",
    functionary_section_title: "高度な機能性",
    functionary_title1: "堅牢性と柔軟性を実現",
    functionary_subtitle1: '堅牢で拡張性に富むプラグイン型ブロックチェーン',
    functionary_body1: '一般的にブロックチェーンは、ブロックチェーン上のスマートコントラクトと呼ばれるトランザクションロジック(取引処理)を、自身で開発する必要があります。ブロックチェーン上の取引は取消ができないため、デプロイしたトランザクションロジックに不具合が生じた場合や脆弱性があった場合に、取り返しのつかない損失を被る可能性があり、開発者はシステム検証、デバッグに多大な時間をかけていました。Symbolは、トランザクションロジックがあらかじめ豊富にビルトインされているため拡張性に富み、それらは検証済みのためとても堅牢です。開発者は公開されているSDKやREST APIを介してこれらの高度なプラグイン型のトランザクションロジックを組み合わせ、利用することが容易に出来ます。',
    functionary_title2: 'ビルトイン',
    functionary_subtitle2: '高度な取引機能を標準でビルトイン',
    functionary_body2: '特徴的な機能としてアグリゲートボンデッドというトランザクションタイプを有します。複数ウォレットの署名が必要な形式で、最大48時間以内に全員の署名が集まらなければ取引が確定しません。取引が確定されるまでは「パーシャル」と呼ぶ状態でブロックチェーン上にキャッシュされます。ビルトインで利用する事ができる為、簡単に既存のシステムへ高度なスマートコントラクトを実装する事ができます。',
    functionary_title3: '簡単/便利',
    functionary_subtitle3: "ノーコードでアセット・ネームスペースの発行が可能",
    functionary_body3: 'Symbolではチェーン内の基軸通貨である「symbol:xym」とは別に、「モザイク」と呼ぶ独自のトークン（アセット）を開発者、または一般利用者が簡単に発行する事ができます。モザイクは通貨と同様にトランザクションを介して送受信する事ができ、例えば”独自通貨としての活用”や”証明書としての利用”等、ブロックチェーン上の取引を多次元に構成する事ができます。また、「ネームスペース」機能を別途利用可能で、Internetにおけるドメインのように、モザイクやアカウントに独自のラベルやメタデータを付与することもできます。',
    secure_section_title: "安全な取引をサポート",
    secure_title1: 'セキュアなマルチシグ署名に標準対応',
    secure_body1: '特徴的な機能として、最大25名の署名者を設定できるマルチシグ(multi-signature)を、最大3層(multi-level)に渡って設定することが可能です。このマルチシグと多層ロジックアプローチを組み合わせることにより、承認ロジックに柔軟性を持たせる事ができます。また、万一秘密鍵を紛失した場合などに、他の連署者全員による署名で、アクセスを回復する事も可能です。このことは、ブロックチェーンの実装において、利用者の実務に応じたセキュリティ設計と、柔軟な運用を容易にすることができます。',
    secure_title2: '高速かつ堅牢な4層ネットワークを提供',
    secure_body2: 'Symbolは4層からなるネットワークで構成されています。バックボーンを維持しチェーンの分散化や状態記録を行う「PeerNode」、各ウォレットからの取引要求を処理しブロックを生成する「APINode」、APINode上で各ウォレットからの処理要求を受付する「Rest Gateway」、各ウォレットやSDKである「Client」からなるネットワークをモジュール化して展開する事で、セキュリティの担保や容易なアップデートを可能にしています。',
    secure_title3: 'コンセンサスアルゴリズムに PoS+ を採用',
    secure_body3: 'コンセンサスアルゴリズムはブロックチェーン内のノードがブロックを生成する為の合意形成ロジックです。NEMで採用されていたPoIの改良版としてPoS＋（Proof of Stake Plus）を採用致しました。Symbolではブロックチェーンの維持に貢献したノード、ウォレットに対して「ハーベスティング」（ステーキング）と呼ばれる報酬が分配されます。報酬分配先の決定には “保持するトークン総量” “ウォレットが支払った手数料総量” “過去報酬を得た回数” を考慮した重要度スコアが用いられ、特定のアカウントに富が集中し続ける事を抑止します。こうしたウォレットの「信用度」でブロックが生成される為、ハッシュレートに基づくタイプに比べ、環境にも優しいアルゴリズムとなっております。',
    easy_section_title: '手軽に既存のシステムへ導入可能',
    easy_section_body: 'Symbolでは利用者に対してウォレットの他に、「SDK」と「Rest API」といったツールが提供されています。専用のプログラミング言語を新たに覚える必要はなく、利用中の「Javascript/Typescript」や「Java」「Python」また、それ以外の言語でもRest APIを経由してブロックチェーンへの取引要求や読み取りを可能としています。高度なマルチシグやトランザクションもビルトインの形式である為、SDKやAPIを介して即座に組み込みが可能です。',
    easy_section_button: "SDKに入門する",
    news_title: 'ニュースリリース',
    start_title: 'はじめよう Symbol',
    start_card1: 'ウォレットの選び方',
    start_card1_link:"/docs/1",
    start_card2: '注意するべきこと',
    start_card2_link:"/docs",
    start_card3: '困った時相談先',
    start_card3_link:"/community",
    start_card4: '開発者向けの情報',
    start_card4_link:"/docs",
    end_message_title: "Let's go explorer",
    end_message_body: '取引状況を確認する',
    about_site_management_title: "About Us",
    about_site_management_body: "Symbol Community Web はコミュニティのメンバーによって運営されています。サイトを運営するチームを紹介します。",
  },
  about: {
    page_title: 'About Us',
    page_title_description: "Symbol Community Web は サイトの維持と開発を行うチームがあります",
    body_markdown: `
## Symbol Community Web チームについて
私たちは Symbol/NEM の成長を応援するコミュニティから生まれたチームです。チームには誰もが参加する事が出来ます。サイトはオープンソースリソースとして公開され、誰でも貢献する事が出来ます。私たちは Symbol Community Web を開発・維持する中で次の目標を実現します。

## 目標
私たちは次の目標を掲げます
- 新しいユーザーが安全にブロックチェーンに触れる事が出来る,
- 新しいユーザーが Symbol/NEM を使い始めるのを助ける,
- Symbol/NEM の最新の情報を届ける,
- 既に活動する人々と新しいユーザーを繋ぐ,
- コミュニティによって作成されたリソースを紹介する,
- ブロックチェーンで社会の課題と向き合うきっかけを作る,

## 主義・思想
### 1. Symbol/NEM の入り口を提供します
Symbol Community Web は新しい人々に Symbol/NEM とは何か、知ってもらうきっかけを提供します。入門者にとって適切な情報を届ける事で新しいユーザーのオンボーディングを支援します。あらゆる場所で活動する人々、ツールの情報を統合し、見つけやすくしていきます。このサイトは既存の Symbol/NEM ユーザーの為だけのものではありません。

世界中の新たなユーザーに適切な情報を届けられるよう、日々フィードバックを受け、人々と共に成長していきます。

### 2. 人々と共に成長します
Symbol/NEM やそれらを活用したエコシステムは常に成長し、変化していきます。変化に対応していく為、Symbol Web はオープンソースとして公開され、修正の提案・変更リクエストを上げる事が出来ます。また、変化に柔軟に対応出来るよう、サイトのコンテンツの大部分はソースコードより切り離されています。この仕組みにより非技術者でもサイトの修正や記事の作成に貢献する事が出来ます。

変更を提案したり、寄稿し私たちを支援してくれる場合は [Discord](https://discord.gg/JTxYPVTf) より問い合わせ頂くか、アカウントをお持ちの方は [Portal](https://cms.symbol-community.com/admin/auth/login) より編集下さい。

## 寄稿について
Symbol Web へ記事を寄稿したい場合は、Discordへお越し下さい。記事を事前に作成される場合は、以下のスタイルガイドに即して下さい。

1. 提出物: タイトル、30文字以内の要約、ヘッダー画像、Markdown形式の本文
2. ファイルフォーマットは .md（markdown） にて作成下さい
3. 以下の通り書式が利用出来ます
4. h1-6, bold, italic, underline, strikethrough, bullet/numberlist, code, image, link, quote
5. 画像ファイルは本サーバー内へ保管する必要があります
6. 継続的な執筆者はアカウントを払い出し直接変更することも出来ます
7. フリー素材の画像を用いる時は十分に著作権に注意して下さい

## Portal へのログイン方法について
Symbol Community Web の記事を編集、追加するには Portal からの操作が必要になります。Portal のアカウントは従来のID・PWによるものではなく、Symbol Blockchain のアカウントにより認証が行われます。ポータルへのアクセスには以下が必要となります。

1. アクティブな Symbol アドレス
2. [SSS Extention](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan?hl=ja)

また、用意頂いた Symbol アドレスがポータルへアクセスする権限を許可するには既存のコントリビューターより権限を追加する必要があります。権限の追加をしたい場合は、 [Discord](https://discord.gg/JTxYPVTf)  へ連絡して下さい
他、記事以外の ページを編集する際には [GitHub](https://github.com/ymuichiro/symbol_web) より遠慮なくプルリクエストをお送り下さい。
`,
  },
  news: {
    page_title: 'ニュースリリース',
    page_title_description: "Symbol/NEM からのトピックスを掲載します",
    no_articles: '記事がありませんでした',
  },
  community: {
    page_title: 'コミュニティ',
    page_title_description: "SymbolやNEMの情報を発信しているサイト、アカウントをフォローしよう",
    section_title_release: 'コミュニティからのお知らせ',
    no_articles: '記事がありませんでした',
    community_introduce_section1: "チャット",
    community_introduce_section2: "Twitter",
    community_introduce_section3: "ブログ & フォーラム",
    section1_title1: "NEM & Symbol",
    section1_body1: "NEM/Symbol のコントリビューターが日々議論したりアナウンスを行う場です",
    section1_url1: "https://discord.gg/EEdJKBMVVb",
    section1_title2: "nem Japan User Group",
    section1_body2: "Symbol/NEM の日本の開発者が集まっています。Symbol/NEM の周辺開発で詰まった時に質問しましょう",
    section1_url2: "https://discord.gg/5CKEnxsJkX",
    section1_title3: "Symbol Times",
    section1_body3: "Symbol/NEM の日本や海外でのトピックスやニュースを運営している方々のチャットルームです",
    section1_url3: "https://discord.gg/28evg3zQpK",
    section1_title4: "Symbol/NEM Marketing",
    section1_body4: "Symbol/NEM の具体的な活用方法や社会への導入方法を議論、アクションしたい方々のチャットルームです",
    section1_url4: "https://discord.gg/A8MRq5Vuvt",
    section1_title5: "Tanuson Slack https://tanuson.slack.com",
    section1_body5: "ノードの構築方法やメンテナンス等インフラ維持の職人が集まっています。ノードを立てたい方は参加しましょう。",
    section1_url5: "https://tanuson.slack.com/",
    section2_title1: "Symbol",
    section2_body1: "Symbol の公式アカウントです",
    section2_url1: "https://twitter.com/thesymbolchain",
    section2_title2: "NEM",
    section2_body2: "NEM の公式アカウントです",
    section2_url2: "https://twitter.com/nemofficial",
    section2_title3: "The Symbol Syndicate",
    section2_body3: "Symbol コントリビューターからの公式アナウンス等が行われます",
    section2_url3: "https://twitter.com/SymbolSyndicate",
    section2_title4: "Lingua Franca",
    section2_body4: "Symbol/NEM 関連の資金提供周りの情報発信が行われます",
    section2_url4: "https://twitter.com/aBermudaCompany",
    section2_title5: "Fushichou Foundation",
    section2_body5: "Symbol/NEM のエコシステム成長に向けた活動を行なっています",
    section2_url5: "https://twitter.com/TheFushichou",
    section2_title6: "Symbol & NEM Community Info",
    section2_body6: "日本の Symbol/NEM コミュニティより情報発信を行なっています",
    section2_url6: "https://twitter.com/symnem_com_info",
    section3_title1: "Symbol Blog",
    section3_body1: "Symbol 関連のニュースやトピックスを掲載しています",
    section3_url1: "https://symbolblog.com/",
    section3_title2: "Symbol Times",
    section3_body2: "Symbol 関連のニュースやトピックスを掲載しています",
    section3_url2: "https://symboltimes.com/",
    section3_title3: "nemedia",
    section3_body3: "日本のユーザーがNEMやSymbolの情報を発信しています",
    section3_url3: "https://nemedia.jp/official/",
    section3_title4: "Symbol Japan Forum（アーカイブ）",
    section3_body4: "Symbol/NEM マーケティング部の以前の活動の場です。現在は情報のアーカイブ先として利用しています",
    section3_url4: "https://github.com/ymuichiro/symbol_japan_forum",
    section3_title5: "NEMLOG",
    section3_body5: "Symbol/NEM の投げ銭機能つき、BLOGサービスです。誰でも投稿できます。",
    section3_url5: "https://nemlog.nem.social/",
    section3_title6: "Everyday Symbol（決済対応店一覧）",
    section3_body6: "Symbolによる決済に対応した店舗一覧をまとめています",
    section3_url6: "https://everyday-symbol.studio.site/",
  }, 
  docs: {
    page_title: 'ドキュメント',
    page_title_description: "Symbol/NEM に関する学びを得よう",
    section_title_wellcom: '初めてお越しの方へ',
    section_title_wellcom_body: "ブロックチェーンに初めて触れる方は必ずご確認下さい。",
    advice_title1: 'ニーモニック、秘密鍵は誰にも教えないで下さい',
    advice_body1: "あなたの資産が入ったウォレットの秘密鍵やニーモニックは第三者から聞かれても絶対に教えないで下さい。あなたの資産へのアクセス権を全て相手に譲渡した形となり、盗難に遭うリスクがあります。",
    advice_button1_1: "ニーモニックについて学ぶ",
    advice_button1_1_link: "https://docs.symbol.dev/ja/concepts/cryptography.html#hd-wallets-and-mnemonics",
    advice_button1_2: "秘密鍵について学ぶ",
    advice_button1_2_link: "https://docs.symbol.dev/ja/concepts/account.html#private-key",
    advice_title2: "ニーモニック、秘密鍵のバックアップは必ず保管して下さい",
    advice_body2: "紛失してしまった場合、いかなる場合も再発行が出来ません。永久に保有していたトークンへのアクセス権が消失する為、必ずバックアップを保管するようにして下さい。",
    advice_button2_1: "バックアップの取得方法",
    advice_button2_1_link:"https://docs.symbol.dev/ja/guides/account/creating-an-account.html#method-01-using-the-desktop-wallet",
    advice_title3: "「署名」は常に取引内容を確認してから行いましょう",
    advice_body3:"ブロックチェーンにおいて、取引を承認時に署名を行います。署名をする事でその取引は承認され、取引が実行されます。取引は自分から送る事も相手から送る事も可能である為、悪意のある第三者が自身の資産を奪う取引を送りつける事例がありました。必ず取引への署名前には危険な取引内容ではないか確認しましょう",
    advice_button3_1: "過去の事例について学ぶ",
    advice_button3_1_link:"https://docs.symbol.dev/ja/guides/account/scams-and-security.html",
    advice_title4: "ブロックチェーン関連アプリの開発者の方へ",
    advice_body4:"本サイトはSymbol/NEMやブロックチェーンに触れ始めた方や、各種ニュースの発信に特化しています。開発者やクリエイターの方で、活動の為の情報をお探しの際には以下のリンクからより詳細なサイトへアクセス下さい。もしくはコミュニティのチャットルームにて質問内容について投稿下さい。",
    advice_button4_1: "Symbol Documentation",
    advice_button4_1_link:"https://docs.symbol.dev/ja/concepts/overview.html",
    advice_button4_2: "速習Symbol",
    advice_button4_2_link:"https://github.com/xembook/quick_learning_symbol",
    advice_title5: "本サイトについて",
    advice_body5:"本サイトはコミュニティの有志により運営されています。内容の修正や記事の追加にはGitHub、もしくはポータルサイトからの修正が必要となります。またポータルサイトのログインにはSymbolアドレスからの署名を必要とします。詳細は 「Symbol/NEM マーケティング部」へお問い合わせ下さい。",
    advice_button5_1: "Symbol/NEM マーケティング部",
    advice_button5_1_link:"https://discord.gg/JTxYPVTf",
    advice_button5_2: "Symbol WEB GitHub",
    advice_button5_2_link:"https://github.com/ymuichiro/symbol_web",
    advice_button5_3: "Symbol WEB ポータル",
    advice_button5_3_link:"https://cms.symbol-community.com/",
    
    section_search_article: '記事を検索する',
    search_bar_placeholder: '検索したい事を入力して下さい',
    no_articles: '記事がありませんでした',
  },
};

export type i18n = typeof ja;