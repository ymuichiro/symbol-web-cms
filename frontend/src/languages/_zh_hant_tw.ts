import ja from './_ja';

// prettier-ignore
const zhHantTw: typeof ja = {
  index: {
    meta_page_title: 'Blockchain Symbol Community',
    meta_page_description: '為 NEM 注入新思想的公共區塊鏈符號的網站。 您可以成為第一個查看最新消息的人。 您還可以獲得有關社區的信息。',
    title_message: '歡迎來到 Symbol & NEM。每個人都能隨時在第一層區塊鏈上輕鬆地安裝和創建區塊！',
    history_title1: '啟發於 NEM 的公共區塊鏈',
    title_button1: 'Install wallet',
    title_button2: 'Start Development',
    history_body1: "於 2014 年推出最初的 NEM 區塊鏈後，代號 “Catapult” 重新開發，目的是提高性能、增強功能、完善共識算法。在2021 年，“Symbol” 使用完整的 “Catapult” 代碼庫作為一個獨特的區塊鏈啟動。而發布幾個月後，跨越 NEM 和 Symbol 的 “社區硬分叉” 成功地開闢了一條新的道路； 這個新方向包括強調參與社區、真正的去中心化，以及促進最終從 NEM 和 Symbol 出現的通用跨鏈協作的新型協議層願景",
    history_body1_Button: "什麼是NEM?",
    functionary_section_title: "高級功能",
    functionary_title1: "魯棒性(Robustness)和靈活性(flexibility)",
    functionary_subtitle1: '旨在實現最大可擴展性且基於插件的架構',
    functionary_body1: 'Symbol通過其基於插件的架構，具有堅如磐石的接口和出色的可擴展性。開發人員可以輕鬆組合和利用進階插件界面，包括指令行界面、公共 SDK、REST API。通常用戶需要在區塊鏈上開發所謂的智能合約。由於區塊鏈上的交易不可逆，部署的智能合約中任何的缺陷或漏洞都可能導致不可挽回的損失，因此開發人員花費了大量時間進行驗證和調整。 ',
    functionary_title2: '進階交易邏輯',
    functionary_subtitle2: '內置標準化的進階交易功能以及眾多其他創新',
    functionary_body2: "'聚合交易' 是 Symbol 區塊鏈的一個關鍵區別。這些允許將來自一個或多個地址的多個交易與一個或多個簽名捆綁在一起，然後才能處理交易。在需要多重簽名的格式中，除非在最多 48 小時內收集到所有簽名，否則交易將不會被確認。最終確認交易之前，它部分保持或以稱為 '綁定' 的狀態緩存在區塊鏈上。作為一項內置功能，它可以很容易地被最終用戶使用，或在復雜的技術解決方案中實施。 Symbol 區塊鏈本身可以讓您輕鬆地在現有系統中實現高級智能合約。",
    functionary_title3: '簡單/方便',
    functionary_subtitle3: "Symbol通過其無代碼開發區塊鏈平台，簡化了各種代幣類型和命名空間的發行",
    functionary_body3: "Symbol 允許開發人員和用戶在 Symbol 鏈上輕鬆地發行他們自己的資產（稱為 'Mosaic' 的代幣），除了其原生加密貨幣 'symbol:xym'。 Mosaics 可以通過交易以與原生加密貨幣 XYM 相同的方式發送和接收，並且可以促進 Symbol 區塊鏈上的多種用例，如 '獨一無二的代幣'、集中管理的 '證書' 發行、NFTs 等等。 '命名空間' 功能允許以元數據的方式標記 Mosaics 和帳戶，像互聯網上的域名。",
    secure_section_title: "支持安全交易",
    secure_title1: '多重簽名的內置安全性',
    secure_body1: "對多重簽名帳戶的原生支持允許最多 25 個簽名者和最多 3 個簽名級別。多重簽名和多級邏輯方法的結合使審批邏輯具有極大的靈活性。如果一個簽名者丟失了他們的私鑰或需要刪除，可以通過其他共同簽名者的授權來調整對多重簽名帳戶的訪問。這有利於根據用戶的實踐設計安全性和靈活操作的區塊鏈實現。",
    secure_title2: '四層架構提供強大、穩定、安全、快速的堅挺網路',
    secure_body2: "Symbol區塊鏈建立在多層節點架構之上。 PeerNodes維護網絡，去中心化 Symbol 鏈並記錄其交易和歷史。 APINodes、PeerNodes 和錢包接口，用於交易請求、歷史記錄、新塊的生成。 API 節點還包括 Rest 網關，它促進了來自錢包和定制解決方案的各種外部請求。除了 REST API 網關之外，節點還包括一個強大的指令行界面，有助於促進本地化解決方案和插件。 Symbol 客戶端由錢包和 SDK 組成； 它在很大程度上是模塊化的，以鼓勵創新、確保安全和簡化更新。",
    secure_title3: 'PoS+共識算法',
    secure_body3: "共識算法由網絡中的所有參與節點共享或相互同意，並用於生成新塊。 Symbol採用 PoS+（權益證明+）共識算法作為NEM的 PoI（重要性證明）算法改良版。 Symbol的 PoS+ 機制允許節點定期 '收穫' 與其 '重要性' 成比例的新塊。 PoS+ 機制不僅考慮 '質押量'，還通過根據 '錢包使用的總費用' 和 '過去獎勵次數' 計算的活動分數以獎勵參與者，從而促進生態系統的健康 ，用來阻止財富繼續集中在某些賬戶中。 POS+ 算法避免了不必要的能源浪費，並且比保護許多區塊鏈的工作量證明算法更加環保。節點運營商和委託人通過收穫獎勵為維護區塊鏈做出貢獻而獲得獎勵。這些獎勵來自為此目的分配的大量XYM池，並遵循與比特幣區塊獎勵模型相關的獎勵率遞減計劃。",
    easy_section_title: '與現有系統無縫集成',
    easy_section_body: 'Symbol的設計考慮了可用性和可擴展性； 雖然錢包極大地支持普通用戶，但 SDK、CLI、Rest API 集成進階多重簽名和聚合交易等原生內置功能，提供擴展性有效地打破了開發障礙。您無需學習密碼學或特定的編程語言即可與區塊鏈進行深入互動； 即使是初級開發人員和業餘愛好者也可以輕鬆構建。 ',
    easy_section_button1: "開始使用 SDKs 吧",
    easy_section_button2: "SDKs Repository",
    news_title: '新聞發布',
    start_title: 'Symbol入門',
    start_card1: '如何選擇錢包',
    start_card1_link:"/docs/2",
    start_card2: '注意事項',
    start_card2_link:"/docs",
    start_card3: '需要幫助時去哪裡諮詢',
    start_card3_link:"/community",
    start_card4: '開發者須知',
    start_card4_link:"/docs",
    end_message_title: "讓我們一起去探索",
    end_message_body: "查看交易狀態",
    about_site_management_title: "關於我們",
    about_site_management_body: "Symbol社區網站由社區成員運營。認識網站背後的團隊。",
    quick_learn_symbol_link: "https://learn.ja.symbol-community.com/",
  },
  about: {
    meta_page_title: 'Blockchain Symbol Community | 啟發於 NEM 的公共區塊鏈',
    meta_page_description: '下一代區塊鏈符號網站，成為第一個檢查最新信息的人，您還可以獲得有關活躍社區的信息。',
    page_title: 'About Us',
    page_title_description: "Symbol社區網站有一個維護和開發的團隊",
    body_markdown: `
## 關於 Symbol 社區網絡團隊
我們是一個誕生於支持 Symbol/NEM 發展的社區團隊。團隊對所有人開放。該網站作為開源資源向公眾開放，任何人都可以做出貢獻。我們在開發和維護 Symbol 社區網站時實現了以下目標。

## 目標
我們有以下目標
- 新用戶可以安全地體驗區塊鏈
- 幫助新用戶開始使用 Symbol/NEM
- 提供有關 Symbol/NEM 的最新信息
- 將新用戶與已活躍的用戶聯繫起來
- 展示社區創建的資源
- 創造一個機會來面對區塊鏈的社交問題

## 原則與理念
### Symbol社區網站提供了通往 Symbol/NEM 的入口。
Symbol社區網站為新手提供了解 Symbol/NEM 全部內容的機會。它通過向新用戶提供與他們相關的信息以引導他們。我們將集成並使查找有關無處不在的成員和工具的信息變得容易。該站點不僅適用於現有的 Symbol/NEM 用戶。

我們將與大家一起成長，每天接收反饋，以便可以向世界各地的新用戶提供相關信息。

### 2. 與大家共同成長
Symbol/NEM 和使用它的生態系統在不斷發展和變化。為了跟上變化，Symbol Web 是開源的，並接受建議和修改請求。此外，網站的大部分內容都與源代碼分離，可以靈活地適應變化。這種機制允許非技術人員參與站點的修改和文章的創建。

如果您想提出更改建議或通過貢獻幫助我們，請通過 [Discord](https://discord.gg/JTxYPVTf) 聯繫我們，或者如果您有帳戶，請通過 [Portal](https:// cms.symbol-community.com/admin/auth/login）。

## 貢獻
如果您想向 Symbol 網站投稿，請訪問我們的 Discord。如果您提前撰寫文章，請遵循以下風格指南。

1. 投稿：標題、摘要（最多30個字符）、標題圖片、Markdown格式的文本
2. 請創建文件格式為.md (markdown)
3. 可提供以下表格
4. h1-6、粗體、斜體、下劃線、刪除線、項目符號/編號列表、代碼、圖像、鏈接、引用
5. 圖片文件必須存放在本服務器
6. 續作作者可直接通過賬戶支付並變更。
7. 使用免費圖片請注意版權。

## Portal 如何登錄
要在 Symbol 社區網站上編輯或添加文章，您需要登錄 Portal，帳戶將通過您的 Symbol 區塊鏈帳戶而不是傳統的 ID 和 PW 進行身份驗證。要訪問帳戶，您需要具備以下條件：

1. 一個活躍的 Symbol 地址
2. [SSS Extention](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan?hl=ja)

此外，要允許您提供的 Symbol 地址訪問帳戶，您需要添加現有貢獻者的權限。如需添加權限，請聯繫[Discord](https://discord.gg/A8MRq5Vuvt)
此外，在編輯文章以外的頁面時，請隨時從 [GitHub](https://github.com/ymuichiro/symbol_web) 發送請求。
`
  },
  news: {
    meta_page_title: 'Blockchain Symbol Community | 新聞發布',
    meta_page_description: '下一代區塊鏈符號網站，成為第一個檢查最新信息的人，您還可以獲得有關活躍社區的信息。',
    page_title: '新聞發布',
    page_title_description: "來自 Symbol/NEM 的主題將被發布",
    no_articles: '沒有找到相關文章',
  },
  community: {
    meta_page_title: 'Blockchain Symbol Community | 社區',
    meta_page_description: '下一代區塊鏈符號網站，成為第一個檢查最新信息的人，您還可以獲得有關活躍社區的信息。',
    page_title: '社區',
    section_title_release: '來自社區的消息',
    page_title_description: "關注以了解 Symbol 和 NEM 相關的網站和帳戶！",
    no_articles: '沒有找到相關文章',
    community_introduce_section1: "聊天",
    community_introduce_section2: "Twitter",
    community_introduce_section3: "博客和論壇"
  },
  docs: {
    meta_page_title: 'Blockchain Symbol Community | 文檔',
    meta_page_description: '下一代區塊鏈符號網站，成為第一個檢查最新信息的人，您還可以獲得有關活躍社區的信息。',
    page_title: '文檔',
    page_title_description: "了解 Symbol/NEM",
    section_title_wellcom: '對於初次來訪者',
    section_title_wellcom_body: "如果您是區塊鏈新手，請務必查看。",
    advice_title1: '不要與任何人分享您的助記詞和私鑰。',
    advice_body1: "切勿將包含您資產的錢包的私鑰或助記詞提供給第三方，即使他們提出要求。 這是一種將對您資產的所有訪問權限轉移給另一方的形式，您冒著被盜的風險。",
    advice_button1_1: "了解助記詞",
    advice_button1_1_link: "https://docs.symbol.dev/concepts/cryptography.html#hd-wallets-and-mnemonics",
    advice_button1_2: "了解私鑰",
    advice_button1_2_link: "https://docs.symbol.dev/concepts/account.html#private-key",
    advice_title2: "隨時備份助記詞和私鑰",
    advice_body2: "如果丟失，在任何情況下都不能補發。請務必保留代幣的備份副本，因為您將永久失去對代幣的訪問權限。",
    advice_button2_1: "如何備份",
    advice_button2_1_link:"https://docs.symbol.dev/guides/account/creating-an-account.html#method-01-using-the-desktop-wallet",
    advice_title3: "在這樣做之前總是 '簽署' 交易。",
    advice_body3:"在區塊鏈中，交易在被簽署後即獲得批准。通過簽署，交易被批准並執行。由於交易可以由您發送，也可以由對方發送，因此存在惡意第三方發送交易竊取您資產的情況。在簽署交易之前，請務必檢查以確保交易沒有危險！",
    advice_button3_1: "了解過去的案例",
    advice_button3_1_link:"https://docs.symbol.dev/guides/account/scams-and-security.html",
    advice_title4: "對於區塊鏈相關應用的開發者",
    advice_body4:"本網站專門為那些剛剛開始使用 Symbol/NEM 和區塊鏈的人提供服務，並發佈各種新聞。 如果您是開發人員或創作者，並且正在尋找有關如何參與的信息，請單擊下面的鏈接以訪問該站點的更多詳細信息。 或者在社區聊天室中發布您的問題。",
    advice_button4_1: "Symbol文檔",
    advice_button4_1_link:"https://docs.symbol.dev/concepts/overview.html",
    advice_button4_2: "開始使用SDKs",
    advice_button4_2_link:"https://learn.en.symbol-community.com/",
    advice_title5: "關於本網站",
    advice_body5:"該網站由社區志願者維護。修改內容和增加文章需要通過 GitHub 或門戶網站進行修改。該網站需要來自 Symbol 地址的簽名才能登錄。如需更多信息，請聯繫 'Symbol/NEM營銷部門'。",
    advice_button5_1: "Community",
    advice_button5_1_link:"/community",
    advice_button5_2: "Symbol WEB GitHub",
    advice_button5_2_link:"https://github.com/ymuichiro/symbol_web",
    advice_button5_3: "Symbol門戶網站",
    advice_button5_3_link:"https://cms.symbol-community.com/",
    section_search_article: '搜索文章',
    search_bar_placeholder: '請輸入您要搜索的內容',
    no_articles: '沒有找到相關文章',
  },
  common:{
    meta_page_title: 'Blockchain Symbol Community',
  }
};

export default zhHantTw;
