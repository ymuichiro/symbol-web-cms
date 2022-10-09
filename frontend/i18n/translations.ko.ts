import { i18n } from './translations.ja';
// prettier-ignore
export const ko: i18n = {
  index: {
    title_message: 'Symbol & NEM에 오신걸 환영합니다. 누구든지, 언제든지 쉽게 설치하여 L1 체인에 블록을 만들어 낼 수 있습니다.',
    history_title1: 'NEM으로 부터 영감을 받은 블록체인',
    history_body1: "2014년 NEM 블록체인이 출시된 후 코드명 'Catapult'로 성능 및 기능 향상과 함께 새로운 합의 알고리즘을 개발 하였습닌다. 2021년에 완성된 'Catapult'를 성공 적으로 구동시켜 'Symbol'의 메인넷이 런칭되었습니다.",
    history_body1_Button: "NEM이 무엇인가요?",
    functionary_section_title: "고급 기능",
    functionary_title1: "견고성(Robustness)과 유연성(flexibility)",
    functionary_subtitle1: '견고한 플러그인 기반의 아키텍처로 확장성 향상',
    functionary_body1: '일반적으로 사용자가 블록체인에 트랜잭션 로직을 구축하기 위해서는 스마트 컨트렉트라고 불리는 것을 개발해야합니다. 블록체인 상의 트랜잭션은 취소할 수 없기 때문에 배포된 스마트 컨트렉트에 결함이나 취약점이 있는 경우 복구할 수 없는 사고가 발생할 수 있으므로 개발자는 배포하기 전에 검증 및 디버깅에 많은 시간을 소비했습니다. Symbol은 플러그인 기반 아키텍처를 통해 향상된 확장성과 함께 검증된 트랜잭션 로직을 가지고 있습니다. 개발자는 공개 SDK 및 REST API를 통해 이러한 고급 플러그인 트랜잭션 논리를 쉽게 결합하고 활용할 수 있습니다.',
    functionary_title2: '빌트-인',
    functionary_subtitle2: '기본 기능 만으로 구현 가능한 빌트-인 고급 트랜잭션 로직' ,
    functionary_body2: "독특한 트랜잭션 유형 중 하나는 'Aggregate Bonded 트랜잭션'입니다. 여러 계정의 서명이 필요한 트랜잭션 유형으로, 48시간 이내에 모든 서명이 완료될 때까지 거래가 완료되지 않습니다. 트랜잭션이 최종 합의되기 전까지 임시 상태로 유지되고 블록체인에 캐시(Cache)됩니다. 기본 기능으로 기존 시스템에서 이러한 고급 스마트 컨트렉트를 구현하는 데 쉽게 사용할 수 있습니다. ",
    functionary_title3: '쉽고 간편함',
    functionary_subtitle3: "Symbol은 개발 코드가 없어 자체 블록체인 플랫폼이 제공하는 기능만으로 자체 토큰(자산) 발급 및 네임스페이스 생성을 쉽게 생성 가능",
    functionary_body3: "Symbol을 통해 개발자와 사용자는 Symbol 체인에서 고유 통화 'symbol:xym' 외에 '모자이크(Mosaic)'라는 자체 토큰(자산)을 쉽게 발행할 수 있습니다. 모자이크는 기본 통화 XYM과 동일한 방식으로 트랜잭션을 통해 주고받을 수 있으며 Symbol 블록체인(예: '고유 통화' 또는 '인증서')에서 다양한 용도로 사용할 수 있습니다. 또한 '네임스페이스' 기능도 사용 가능하여 모자이크 및 계정을 인터넷의 도메인처럼 특정 영역에서 고유한 레이블과 메타데이터로 운영할 수 있습니다.",
    secure_section_title: "안전한 트랜잭션 지원",
    secure_title1: '기본 기능으로 다중 서명 서명 보호 지원',
    secure_body1: "고유한 기능은 다중 서명 계정이 최대 25명의 서명자와 최대 3단계를 가질 수 있도록 하는 다중 서명입니다. 이 다중 서명과 다중 레벨 논리 접근 방식을 결합하면 트랜잭션 승인을 위한 로직의 유연성을 확보할 수 있습니다. 또한 서명자가 우연히 개인 키를 분실할 수도 있으며, 다른 모든 공동 서명자의 서명으로 계정에 대한 액세스를 복구할 수 있습니다. 이는 사용자의 관행에 따라 보안 설계 및 블록체인 구현의 유연한 운영을 용이하게 합니다.",
    secure_title2: '4계층으로 된 아키텍처로 강력하고 안정적이며 안전하고 빠른 견고한 네트워크 제공',
    secure_body2: "네트워크를 유지 관리하고 심볼 체인을 분산하고 상태를 기록하는 PeerNode의 4계층 아키텍처. 지갑의 트랜잭션 요청을 처리하고 블록을 생성하는 APINode; APINode에서 지갑의 처리 요청을 수락하는 Rest Gateway; 지갑과 SDK인 클라이언트(Client). 지갑과 SDK인 '클라이언트'로 구성된 네트워크를 모듈화하여 배포하여 보안과 업데이트가 용이합니다.",
    secure_title3: 'PoS+ 합의 알고리즘',
    secure_body3: "합의 알고리즘은 블록체인에서 노드별로 블록을 생성하는 합의 논리입니다. Symbol에서는 NEM에서 사용되는 PoI(Proof of Importance)의 개선된 버전으로 PoS+(Proof of Stake Plus) 합의 알고리즘을 채택했습니다. Symbol PoS+ 메커니즘에는 블록체인 유지에 기여하는 노드와 지갑에 분배되는 'Harvesting'(Staking과 유사)이라는 블록 보상이 있습니다. PoS+ 메커니즘은 '스테이킹 금액'뿐만 아니라 '지갑이 사용한 총 수수료'와 '과거 보상 횟수'를 통해 계산된 활동 점수에 따라 참가자에게 보상함으로써 생태계의 건강을 증진합니다. , 특정 계정에 부의 지속적인 집중을 억제하기 위해 사용합니다. 또한 '중요도'에 기반한 블록 생성 알고리즘은 해시레이트 방식보다 오히려 친환경적이기 때문에 지속가능한 시스템을 구현할 수도 있다.",
    easy_section_title: '기존 시스템과의 스무스한 통합',
    easy_section_body: 'Symbol은 사용자에게 지갑과 개발 도구 SDK 및 Rest API를 제공합니다. 사용자는 새로운 특정 프로그래밍 언어를 배울 필요가 없으며 Javascript/Typescript, Java, Python 및 기타 기존 언어를 사용하여 Rest API를 통해 블록체인에서 트랜잭션을 요청하고 읽을 수 있습니다. 고급 다중 서명 및 다양한 트랜잭션과 같은 기본 내장 기능을 SDK 또는 API를 통해 즉시 통합할 수 있습니다.',
    easy_section_button: "SDK를 사용해 시작하기",
    news_title: 'News Release',
    start_title: 'Symbol 시작하기',
    start_card1: '지갑 선택 방법',
    start_card1_link:"/docs/2",
    start_card2: '주의해야 할 사항',
    start_card2_link:"/docs",
    start_card3: '도움이 필요할 때 상담할 수 있는 곳',
    start_card3_link:"/community",
    start_card4: '개발자를 위한 정보',
    start_card4_link:"/docs",
    end_message_title: "함께 탐험하러 떠나요",
    end_message_body: "트랜잭션 상태 확인하기ㄴ",
    about_site_management_title: "About us",
    about_site_management_body: "Symbol Community Web은 커뮤니티 회원이 운영합니다. 사이트 뒤에서 팀을 만나보십시오.",
  },
  about: {
    page_title: 'About Us',
    page_title_description: "Symbol Community WEB에는 사이트를 유지 및 개발하는 팀이 있습니다.",
    body_markdown: `
## Symbol 커뮤니티 웹 팀 소개
우리는 Symbol/NEM의 성장을 지원하는 커뮤니티에서 태어난 팀입니다. 팀은 누구에게나 열려 있습니다. 이 사이트는 오픈 소스 리소스로 대중에게 공개되며 누구나 기여할 수 있습니다. 우리는 Symbol Community Web을 개발하고 유지하면서 다음과 같은 목표를 실현합니다.

## 목표
우리는 다음과 같은 목표를 가지고 있습니다
- 신규유저들이 안전하게 블록체인을 체험할 수 있으며,
- 신규 사용자가 Symbol/NEM을 시작할 수 있도록 지원
- Symbol/NEM에 대한 최신 정보 가져오기,
- 새로운 사용자를 이미 활성화된 사용자와 연결하고,
- 커뮤니티에서 만든 리소스를 보여주고,
- 블록체인으로 사회적 문제에 직면할 수 있는 기회를 만들고,

## 원칙과 철학
### 1. Symbol Community Web은 Symbol/NEM에 대한 게이트웨이를 제공합니다.
Symbol Community Web은 신규 이민자에게 Symbol/NEM이 무엇인지 배울 수 있는 기회를 제공합니다. 새로운 사용자에게 관련 정보를 제공하여 온보딩을 돕습니다. 우리는 모든 곳에서 일하는 사람과 도구에 대한 정보를 쉽게 찾을 수 있도록 통합할 것입니다. 이 사이트는 기존 Symbol/NEM 사용자만을 위한 것이 아닙니다.  

우리는 전 세계의 새로운 사용자에게 관련 정보를 전달할 수 있도록 매일 피드백을 받고 사람들과 함께 성장할 것입니다.

### 2. 사람과 함께 성장하다
Symbol/NEM과 이를 사용하는 생태계는 끊임없이 성장하고 변화합니다. 변화에 발맞추기 위해 Symbol Web은 오픈 소스이며 제안 및 수정 요청에 열려 있습니다. 또한 대부분의 사이트 콘텐츠는 변경 사항에 유연하게 적응할 수 있도록 소스 코드와 분리되어 있습니다. 이 메커니즘을 통해 비기술자도 사이트 수정 및 기사 작성에 기여할 수 있습니다.  

변경을 제안하거나 사이트에 기여하여 저희를 돕고 싶다면 [Discord](https://discord.gg/JTxYPVTf) 또는 계정이 있는 경우 [Portal](https://cms.symbol-community.com/admin/auth/login)을 통해 저희에게 연락하십시오.

## 기여
Symbol Web에 기사를 기고하려면 Discord를 방문하십시오. 글을 미리 작성하고 계시다면 아래의 스타일 가이드를 따라주세요.  

1. 제목, 30단어 이내의 요약, 헤더 이미지를 제출하십시오.
2. 파일 형식: .md(마크다운).
3. 다음 형식이 허용됩니다.
4. h1-6, 굵게, 기울임꼴, 밑줄, 취소선, 글머리 기호/번호 목록, 코드, 이미지, 링크, 인용.
5. 이미지 파일은 이 서버에 저장되어야 합니다.
6. 계속 작가는 자신의 계정을 지불하고 직접 변경할 수 있습니다.
7. 무료 이미지 사용 시 저작권에 주의하시기 바랍니다.

## 포털에 로그인하는 방법
Symbol Community Web에서 기사를 편집하거나 추가하려면 포털에 로그인해야 합니다. 여기서 계정은 기존 ID 및 PW 대신 Symbol Blockchain 계정으로 인증됩니다. 포털에 액세스하려면 다음이 필요합니다.

1. 활성화 된 심볼 주소
2. [SSS Extention](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan?hl=ja)

또한 심볼 주소가 포털에 액세스할 수 있도록 하려면 기존 기여자의 권한을 추가해야 합니다. 권한 추가를 원하시면 [Discord](https://discord.gg/JTxYPVTf)로 연락주세요.
기사 이외의 다른 페이지를 편집하고 싶다면 [GitHub](https://github.com/ymuichiro/symbol_web)를 통해 풀 리퀘스트(Pull Request)를 보내주세요.
`
  },
  news: {
    page_title: 'News Release',
    page_title_description: "Symbol & NEM으로 부터 게시 된 토픽",
    no_articles: '아티클을 찾을 수 없습니다',
  },
  community: {
    page_title: '커뮤니티',
    section_title_release: '커뮤니티로 부터 온 뉴스',
    page_title_description: "Symbol과 NEM에 대한 정보를 알려주는 사이트와 계정을 팔로우하세요!",
    no_articles: '아티클을 찾을 수 없습니다',
    community_introduce_section1: "대화",
    community_introduce_section2: "트위터",
    community_introduce_section3: "블로그 & 포럼",
    section1_title1: "NEM & Symbol",
    section1_body1: "NEM & Symbol 기여자들이 매일 토론하고 발표하는 장소",
    section1_url1: "https://discord.gg/EEdJKBMVVb",
    section1_title2: "nem Japan User Group",
    section1_body2: "일본의 Symbol & NEM 개발자들은 Symbol & NEM 개발에 어려움이 있을 때 함께 모여 질문합니다.",
    section1_url2: "https://discord.gg/wa4BsYQz",
    section1_title3: "Symbol Times",
    section1_body3: "일본 및 해외에서 Symbol/NEM 주제 및 뉴스를 운영하는 사람들을 위한 대화방입니다.",
    section1_url3: "https://discord.gg/PjGPuz2Z",
    section1_title4: "Symbol/NEM Marketing",
    section1_body4: "Symbol & NEM을 구체적으로 활용하여 사회에 소개하고 싶은 사람들을 위한 대화방입니다.",
    section1_url4: "https://discord.gg/JTxYPVTf",
    section1_title5: "Tanuson Slack https://tanuson.slack.com",
    section1_body5: "노드를 구축하고 유지 관리하고 기타 인프라를 유지 관리하는 방법을 알고 있는 장인 그룹이 있습니다. 노드를 설정하려면 우리와 함께하십시오.",
    section1_url5: "https://tanuson.slack.com/",
    section2_title1: "The Symbol Syndicate",
    section2_body1: "Symbol 핵심 개발자 팀으로, 해당 트윗을 팔로우해 소식을 전달 받을 수 있습니다.",
    section2_url1: "https://twitter.com/SymbolSyndicate",
    section2_title2: "Lingua Franca",
    section2_body2: "Symbol & NEM 관련 자금 조달을 관리하는 팀입니다.",
    section2_url2: "https://twitter.com/aBermudaCompany",
    section2_title3: "Fushichou Foundation",
    section2_body3: "Symbol & NEM의 생태계를 성장시키기 위한 활동을 하는 재단입니다.",
    section2_url3: "https://twitter.com/TheFushichou",
    section2_title4: "NEM",
    section2_body4: "NEM의 공식 계정",
    section2_url4: "https://twitter.com/nemofficial",
    section2_title5: "Symbol & NEM Community Info",
    section2_body5: "일본 Symbol & NEM 커뮤니티의 정보",
    section2_url5: "https://twitter.com/symnem_com_info",
    section3_title1: "Symbol Blog",
    section3_body1: "Symbol 관련 뉴스 및 주제",
    section3_url1: "https://symbolblog.com/",
    section3_title2: "Symbol Times",
    section3_body2: "Symbol 관련 뉴스 및 주제",
    section3_url2: "https://symboltimes.com/",
    section3_title3: "nemedia",
    section3_body3: "일본 사용자들이 NEM과 Symbol에 대한 정보를 공유하는 곳",
    section3_url3: "https://nemedia.jp/official/",
    section3_title4: "Symbol Japan Forum（archive）",
    section3_body4: "이것은 Symbol & NEM 마케팅 부서의 이전 아카이브입니다. 현재 정보를 보관하는 장소로 사용 중",
    section3_url4: "https://github.com/ymuichiro/symbol_japan_forum",
    section3_title5: "NEMLOG",
    section3_body5: "Symbol과 NEM 기부 기능이 함께 있는 블로그 서비스 (누구든지 참여 가능)",
    section3_url5: "https://nemlog.nem.social/",
    section3_title6: "Everyday Symbol（List of stores that accept payment）",
    section3_body6: "Symbol 결제를 지원하는 상점들의 목록을 정리한 페이지",
    section3_url6: "https://everyday-symbol.studio.site/",
  },
  docs: {
    page_title: '문서',
    page_title_description: "Symbol & NEM에 대해 배울 수 있는 곳",
    section_title_wellcom: '처음 방문하는 사용자 분들에게',
    section_title_wellcom_body: "블록체인에 새로 참여하는 것이라면, 반드시 아래 내용을 확인하세요.",
    advice_title1: '니모닉(mnemonic)과 개인키는 절때 다른 사람과 공유하지마세요.',
    advice_body1: "귀하의 자산이 포함된 지갑의 개인 키나 니모닉을 제3자가 요청하더라도 절대 제공하지 마십시오. 이것은 자산에 대한 모든 액세스 권한을 상대방에게 양도하는 형태이며 도난 위험이 있습니다.",
    advice_button1_1: "니모닉(mnemonic)에 대해 알아보기",
    advice_button1_1_link: "https://docs.symbol.dev/concepts/cryptography.html#hd-wallets-and-mnemonics",
    advice_button1_2: "개인키에 대해 알아보기",
    advice_button1_2_link: "https://docs.symbol.dev/concepts/account.html#private-key",
    advice_title2: "항상 니모닉 및 개인 키의 백업을 유지",
    advice_body2: "분실 시 어떠한 경우에도 재발급이 불가능합니다. 토큰에 영구적으로 액세스할 수 없으므로 토큰의 백업 사본을 보관하십시오.",
    advice_button2_1: "백업하는 방법 알아보기",
    advice_button2_1_link:"https://docs.symbol.dev/guides/account/creating-an-account.html#method-01-using-the-desktop-wallet",
    advice_title3: "트랜잭션을 생성 하기 전에 항상 '서명(sign)'하십시오.",
    advice_body3:"블록체인에서 트랜잭션은 승인될 때 서명됩니다. 서명함으로써 트랜잭션이 승인되고 실행됩니다. 트랜잭션은 본인 또는 상대방에 의해 전송될 수 있으므로 악의적인 제3자가 거래를 전송하여 자산을 훔치는 경우가 있었습니다. 트랜잭션에 서명하기 전에 해당 트랜잭션이 위험하지 않은지 항상 확인하십시오!",
    advice_button3_1: "과거 케이스에 대해 알아보기",
    advice_button3_1_link:"https://docs.symbol.dev/guides/account/scams-and-security.html",
    advice_title4: "블록체인 관련 애플리케이션 개발자용",
    advice_body4:"이 사이트는 Symbol & NEM 및 블록체인을 이제 막 시작하는 사람들과 다양한 소식을 전파하는 데 전념하고 있습니다. 개발자 또는 제작자이고 참여 방법에 대한 정보를 찾고 있다면 아래 링크를 클릭하여 사이트에 더 자세히 액세스하십시오. 또는 커뮤니티 채팅방에 질문을 게시하세요.",
    advice_button4_1: "Symbol 공식 문서",
    advice_button4_1_link:"https://docs.symbol.dev/concepts/overview.html",
    advice_button4_2: "SDK를 사용해 시작하기",
    advice_button4_2_link:"https://github.com/xembook/quick_learning_symbol",
    advice_title5: "해당 사이트에 대해 알아보기",
    advice_body5:"이 사이트는 커뮤니티의 자원 봉사자가 유지 관리합니다. 내용 수정 및 기사 추가는 GitHub 또는 포털 사이트를 통한 수정이 필요합니다. 포털은 로그인을 위해 Symbol 주소의 서명이 필요합니다. 자세한 사항은 'Symbol/NEM Marketing Department'로 문의하시기 바랍니다.",
    advice_button5_1: "Symbol/NEM Marketing Department",
    advice_button5_1_link:"https://discord.gg/JTxYPVTf",
    advice_button5_2: "Symbol WEB GitHub",
    advice_button5_2_link:"https://github.com/ymuichiro/symbol_web",
    advice_button5_3: "Symbol WEB Portal",
    advice_button5_3_link:"https://cms.symbol-community.com/",
    section_search_article: '아티클 찾아보기',
    search_bar_placeholder: '찾아보고 싶은 내용을 입력하기',
    no_articles: '아티클을 찾을 수 없습니다',
  },
};
