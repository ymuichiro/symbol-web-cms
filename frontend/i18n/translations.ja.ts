// prettier-ignore
export const ja = {
  index: {
    title_message: '個人に力を与える、ブロックチェーン',
    feature_title1: 'NEMの後継パブリックブロックチェーン',
    feature_body1: '2014年に登場したNEMに対して、性能向上、機能強化、コンセンサスアルゴリズムの改良を目的として、「Catapult」というコードネームで開発が行われていました。これが完成し、「Catapult」を搭載して2021年にリリースされたパブリックブロックチェーンが「Symbol」です。Symbolは以下に紹介するような特徴を有しています。',
    feature_title2: '堅牢で拡張性に富むプラグイン型ブロックチェーン',
    feature_body2: '一般的にブロックチェーンは、ブロックチェーン上のスマートコントラクトと呼ばれるトランザクションロジック(取引処理)を、自身で開発する必要があります。ブロックチェーン上の取引は取消ができないため、デプロイしたトランザクションロジックに不具合が生じた場合や脆弱性があった場合に、取り返しのつかない損失を被る可能性があり、開発者はシステム検証、デバッグに多大な時間をかけていました。Symbolは、トランザクションロジックがあらかじめ豊富にビルトインされているため拡張性に富み、それらは検証済みのためとても堅牢です。開発者は公開されているSDKやREST APIを介してこれらの高度なプラグイン型のトランザクションロジックを組み合わせ、利用することが容易に出来ます。',
    feature_title3: 'セキュアなマルチシグ署名に標準対応',
    feature_body3: '特徴的な機能として、最大25名の署名者を設定できるマルチシグ(multi-signature)を、最大3層(multi-level)に渡って設定することが可能です。このマルチシグと多層ロジックアプローチを組み合わせることにより、承認ロジックに柔軟性を持たせる事ができます。また、万一秘密鍵を紛失した場合などに、他の連署者全員による署名で、アクセスを回復する事も可能です。このことは、ブロックチェーンの実装において、利用者の実務に応じたセキュリティ設計と、柔軟な運用を容易にすることができます。',
    feature_title4: '高度な取引機能を標準でビルトイン',
    feature_body4: '特徴的な機能としてアグリゲートボンデッドというトランザクションタイプを有します。複数ウォレットの署名が必要な形式で、最大48時間以内に全員の署名が集まらなければ取引が確定しません。取引が確定されるまでは「パーシャル」と呼ぶ状態でブロックチェーン上にキャッシュされます。ビルトインで利用する事ができる為、簡単に既存のシステムへ高度なスマートコントラクトを実装する事ができます。',
    feature_title5: 'ノーコードでアセット・ネームスペースの発行が可能',
    feature_body5: 'Symbolではチェーン内の基軸通貨である「symbol:xym」とは別に、「モザイク」と呼ぶ独自のトークン（アセット）を開発者、または一般利用者が簡単に発行する事ができます。モザイクは通貨と同様にトランザクションを介して送受信する事ができ、例えば”独自通貨としての活用”や”証明書としての利用”等、ブロックチェーン上の取引を多次元に構成する事ができます。また、「ネームスペース」機能を別途利用可能で、Internetにおけるドメインのように、モザイクやアカウントに独自のラベルやメタデータを付与することもできます。',
    feature_title6: '高速かつ堅牢な4層ネットワークを提供',
    feature_body6: 'Symbolは4層からなるネットワークで構成されています。バックボーンを維持しチェーンの分散化や状態記録を行う「PeerNode」、各ウォレットからの取引要求を処理しブロックを生成する「APINode」、APINode上で各ウォレットからの処理要求を受付する「Rest Gateway」、各ウォレットやSDKである「Client」からなるネットワークをモジュール化して展開する事で、セキュリティの担保や容易なアップデートを可能にしています。',
    feature_title7: 'コンセンサスアルゴリズムに PoS+ を採用',
    feature_body7: 'コンセンサスアルゴリズムはブロックチェーン内のノードがブロックを生成する為の合意形成ロジックです。NEMで採用されていたPoIの改良版としてPoS＋（Proof of Stake Plus）を採用致しました。Symbolではブロックチェーンの維持に貢献したノード、ウォレットに対して「ハーベスティング」（ステーキング）と呼ばれる報酬が分配されます。報酬分配先の決定には “保持するトークン総量” “ウォレットが支払った手数料総量” “過去報酬を得た回数” を考慮した重要度スコアが用いられ、特定のアカウントに富が集中し続ける事を抑止します。こうしたウォレットの「信用度」でブロックが生成される為、ハッシュレートに基づくタイプに比べ、環境にも優しいアルゴリズムとなっております。',
    feature_title8: '手軽に既存のシステムへ導入可能',
    feature_body8: 'Symbolでは利用者に対してウォレットの他に、「SDK」と「Rest API」といったツールが提供されています。専用のプログラミング言語を新たに覚える必要はなく、利用中の「Javascript/Typescript」や「Java」「Python」また、それ以外の言語でもRest APIを経由してブロックチェーンへの取引要求や読み取りを可能としています。高度なマルチシグやトランザクションもビルトインの形式である為、SDKやAPIを介して即座に組み込みが可能です。',
    news_title: 'ニュースリリース',
    start_title: 'はじめよう Symbol',
    start_card1: 'ウォレットの選び方',
    start_card2: '注意するべきこと',
    start_card3: '困った時相談先',
    start_card4: '開発者向けの情報',
    explorer_title: 'Symbol エクスプローラー',
    explorer_body: 'チェーン上の取引状況を確認してみよう',
  },
  news: {
    page_title: 'ニュースリリース',
    no_articles: '記事がありませんでした',
  },
  community: {
    page_title: 'コミュニティ',
    section_title_release: 'コミュニティからのお知らせ',
    no_articles: '記事がありませんでした',
  },
  docs: {
    section_title_wellcom: 'はじめて来た方へ',
    advice_private_key: '秘密鍵は誰にも知られてはなりません',
    advice_1: '他の注意事項',
    advice_2: '他の注意事項',
    section_search_article: '記事を検索する',
    search_bar_placeholder: '検索したい事を入力して下さい',
    no_articles: '記事がありませんでした',
  },
};

export type i18n = typeof ja;