import ja from './_ja';

// prettier-ignore
const zh: typeof ja = {
  index: {
    title_message: '欢迎来到 Symbol & NEM。每个人都能随时在第一层区块链上轻松地安装和创建区块！',
    history_title1: '启发于 NEM 的公共区块链',
    history_body1: "于 2014 年推出最初的 NEM 区块链后，代号 “Catapult” 重新开发，目的是提高性能、增强功能、完善共识算法。在2021 年，“Symbol” 使用完整的 “Catapult” 代码库作为一个独特的区块链启动。而发布几个月后，跨越 NEM 和 Symbol 的 “社区硬分叉” 成功地开辟了一条新的道路； 这个新方向包括强调参与社区、真正的去中心化，以及促进最终从 NEM 和 Symbol 出现的通用跨链协作的新型协议层愿景",
    history_body1_Button: "什么是NEM?",
    functionary_section_title: "高级功能",
    functionary_title1: "鲁棒性(Robustness)和灵活性(flexibility)",
    functionary_subtitle1: '旨在实现最大可扩展性且基于插件的架构',
    functionary_body1: 'Symbol通过其基于插件的架构，具有坚如磐石的接口和出色的可扩展性。开发人员可以轻松组合和利用进阶插件界面，包括指令行界面、公共 SDK、REST API。通常用户需要在区块链上开发所谓的智能合约。由于区块链上的交易不可逆，部署的智能合约中任何的缺陷或漏洞都可能导致不可挽回的损失，因此开发人员花费了大量时间进行验证和调整。 ',
    functionary_title2: '进阶交易逻辑',
    functionary_subtitle2: '内置标准化的进阶交易功能以及众多其他创新',
    functionary_body2: "'聚合交易' 是 Symbol 区块链的一个关键区别。这些允许将来自一个或多个地址的多个交易与一个或多个签名捆绑在一起，然后才能处理交易。在需要多重签名的格式中，除非在最多 48 小时内收集到所有签名，否则交易将不会被确认。最终确认交易之前，它部分保持或以称为 '绑定' 的状态缓存在区块链上。作为一项内置功能，它可以很容易地被最终用户使用，或在复杂的技术解决方案中实施。 Symbol 区块链本身可以让您轻松地在现有系统中实现高级智能合约。",
    functionary_title3: '简单/方便',
    functionary_subtitle3: "Symbol通过其无代码开发区块链平台，简化了各种代币类型和命名空间的发行",
    functionary_body3: "Symbol 允许开发人员和用户在 Symbol 链上轻松地发行他们自己的资产（称为 'Mosaic' 的代币），除了其原生加密货币 'symbol:xym'。 Mosaics 可以通过交易以与原生加密货币 XYM 相同的方式发送和接收，并且可以促进 Symbol 区块链上的多种用例，如 '独一无二的代币'、集中管理的 '证书' 发行、NFTs 等等。 '命名空间' 功能允许以元数据的方式标记 Mosaics 和帐户，像互联网上的域名。",
    secure_section_title: "支持安全交易",
    secure_title1: '多重签名的内置安全性',
    secure_body1: "对多重签名帐户的原生支持允许最多 25 个签名者和最多 3 个签名级别。多重签名和多级逻辑方法的结合使审批逻辑具有极大的灵活性。如果一个签名者丢失了他们的私钥或需要删除，可以通过其他共同签名者的授权来调整对多重签名帐户的访问。这有利于根据用户的实践设计安全性和灵活操作的区块链实现。",
    secure_title2: '四层架构提供强大、稳定、安全、快速的坚挺网路',
    secure_body2: "Symbol区块链建立在多层节点架构之上。 PeerNodes维护网络，去中心化 Symbol 链并记录其交易和历史。 APINodes、PeerNodes 和钱包接口，用于交易请求、历史记录、新块的生成。 API 节点还包括 Rest 网关，它促进了来自钱包和定制解决方案的各种外部请求。除了 REST API 网关之外，节点还包括一个强大的指令行界面，有助于促进本地化解决方案和插件。 Symbol 客户端由钱包和 SDK 组成； 它在很大程度上是模块化的，以鼓励创新、确保安全和简化更新。",
    secure_title3: 'PoS+共识算法',
    secure_body3: "共识算法由网络中的所有参与节点共享或相互同意，并用于生成新块。 Symbol采用 PoS+（权益证明+）共识算法作为NEM的 PoI（重要性证明）算法改良版。 Symbol的 PoS+ 机制允许节点定期 '收获' 与其 '重要性' 成比例的新块。 PoS+ 机制不仅考虑 '质押量'，还通过根据 '钱包使用的总费用' 和 '过去奖励次数' 计算的活动分数以奖励参与者，从而促进生态系统的健康 ，用来阻止财富继续集中在某些账户中。 POS+ 算法避免了不必要的能源浪费，并且比保护许多区块链的工作量证明算法更加环保。节点运营商和委托人通过收获奖励为维护区块链做出贡献而获得奖励。这些奖励来自为此目的分配的大量XYM池，并遵循与比特币区块奖励模型相关的奖励率递减计划。",
    easy_section_title: '与现有系统无缝集成',
    easy_section_body: 'Symbol的设计考虑了可用性和可扩展性； 虽然钱包极大地支持普通用户，但 SDK、CLI、Rest API 集成进阶多重签名和聚合交易等原生内置功能，提供扩展性有效地打破了开发障碍。您无需学习密码学或特定的编程语言即可与区块链进行深入互动； 即使是初级开发人员和业余爱好者也可以轻松构建。',
    easy_section_button: "开始使用 SDKs 吧",
    news_title: '新闻发布',
    start_title: 'Symbol入门',
    start_card1: '如何选择钱包',
    start_card1_link:"/docs/2",
    start_card2: '注意事项',
    start_card2_link:"/docs",
    start_card3: '需要帮助时去哪里咨询',
    start_card3_link:"/community",
    start_card4: '开发者须知',
    start_card4_link:"/docs",
    end_message_title: "让我们一起去探索",
    end_message_body: "查看交易状态",
    about_site_management_title: "关于我们",
    about_site_management_body: "Symbol社区网站由社区成员运营。认识网站背后的团队。",
    quick_learn_symbol_link: "https://learn.ja.symbol-community.com/",
  },
  about: {
    page_title: 'About Us',
    page_title_description: "Symbol社区网站有一个维护和开发的团队",
    body_markdown: `
## 关于 Symbol 社区网络团队
我们是一个诞生于支持 Symbol/NEM 发展的社区团队。团队对所有人开放。该网站作为开源资源向公众开放，任何人都可以做出贡献。我们在开发和维护 Symbol 社区网站时实现了以下目标。

## 目标
我们有以下目标
- 新用户可以安全地体验区块链
- 帮助新用户开始使用 Symbol/NEM
- 提供有关 Symbol/NEM 的最新信息
- 将新用户与已活跃的用户联系起来
- 展示社区创建的资源
- 创造一个机会来面对区块链的社交问题

## 原则与理念
### Symbol社区网站提供了通往 Symbol/NEM 的入口。
Symbol社区网站为新手提供了解 Symbol/NEM 全部内容的机会。它通过向新用户提供与他们相关的信息以引导他们。我们将集成并使查找有关无处不在的成员和工具的信息变得容易。该站点不仅适用于现有的 Symbol/NEM 用户。

我们将与大家一起成长，每天接收反馈，以便可以向世界各地的新用户提供相关信息。

### 2. 与大家共同成长
Symbol/NEM 和使用它的生态系统在不断发展和变化。 为了跟上变化，Symbol Web 是开源的，并接受建议和修改请求。 此外，网站的大部分内容都与源代码分离，可以灵活地适应变化。 这种机制允许非技术人员参与站点的修改和文章的创建。

如果您想提出更改建议或通过贡献帮助我们，请通过 [Discord](https://discord.gg/JTxYPVTf) 联系我们，或者如果您有帐户，请通过 [Portal](https:// cms.symbol-community.com/admin/auth/login）。

## 贡献
如果您想向 Symbol 网站投稿，请访问我们的 Discord。如果您提前撰写文章，请遵循以下风格指南。

1. 投稿：标题、摘要（最多30个字符）、标题图片、Markdown格式的文本
2. 请创建文件格式为.md (markdown)
3. 可提供以下表格
4. h1-6、粗体、斜体、下划线、删除线、项目符号/编号列表、代码、图像、链接、引用
5. 图片文件必须存放在本服务器
6. 续作作者可直接通过账户支付并变更。
7. 使用免费图片请注意版权。

## Portal 如何登录
要在 Symbol 社区网站上编辑或添加文章，您需要登录 Portal，帐户将通过您的 Symbol 区块链帐户而不是传统的 ID 和 PW 进行身份验证。要访问帐户，您需要具备以下条件：

1. 一个活跃的 Symbol 地址
2. [SSS Extention](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan?hl=ja)

此外，要允许您提供的 Symbol 地址访问帐户，您需要添加现有贡献者的权限。如需添加权限，请联系[Discord](https://discord.gg/A8MRq5Vuvt)
此外，在编辑文章以外的页面时，请随时从 [GitHub](https://github.com/ymuichiro/symbol_web) 发送请求。
`
  },
  news: {
    page_title: '新闻发布',
    page_title_description: "来自 Symbol/NEM 的主题将被发布",
    no_articles: '没有找到相关文章',
  },
  community: {
    page_title: '社区',
    section_title_release: '来自社区的消息',
    page_title_description: "关注以了解 Symbol 和 NEM 相关的网站和帐户！",
    no_articles: '没有找到相关文章',
    community_introduce_section1: "聊天",
    community_introduce_section2: "Twitter",
    community_introduce_section3: "博客和论坛"
  },
  docs: {
    page_title: '文档',
    page_title_description: "了解 Symbol/NEM",
    section_title_wellcom: '对于初次来访者',
    section_title_wellcom_body: "如果您是区块链新手，请务必查看。",
    advice_title1: '不要与任何人分享您的助记词和私钥。',
    advice_body1: "切勿将包含您资产的钱包的私钥或助记词提供给第三方，即使他们提出要求。 这是一种将对您资产的所有访问权限转移给另一方的形式，您冒着被盗的风险。",
    advice_button1_1: "了解助记词",
    advice_button1_1_link: "https://docs.symbol.dev/concepts/cryptography.html#hd-wallets-and-mnemonics",
    advice_button1_2: "了解私钥",
    advice_button1_2_link: "https://docs.symbol.dev/concepts/account.html#private-key",
    advice_title2: "随时备份助记词和私钥",
    advice_body2: "如果丢失，在任何情况下都不能补发。请务必保留代币的备份副本，因为您将永久失去对代币的访问权限。",
    advice_button2_1: "如何备份",
    advice_button2_1_link:"https://docs.symbol.dev/guides/account/creating-an-account.html#method-01-using-the-desktop-wallet",
    advice_title3: "在这样做之前总是 '签署' 交易。",
    advice_body3:"在区块链中，交易在被签署后即获得批准。通过签署，交易被批准并执行。由于交易可以由您发送，也可以由对方发送，因此存在恶意第三方发送交易窃取您资产的情况。在签署交易之前，请务必检查以确保交易没有危险！",
    advice_button3_1: "了解过去的案例",
    advice_button3_1_link:"https://docs.symbol.dev/guides/account/scams-and-security.html",
    advice_title4: "对于区块链相关应用的开发者",
    advice_body4:"本网站专门为那些刚刚开始使用 Symbol/NEM 和区块链的人提供服务，并发布各种新闻。 如果您是开发人员或创作者，并且正在寻找有关如何参与的信息，请单击下面的链接以访问该站点的更多详细信息。 或者在社区聊天室中发布您的问题。",
    advice_button4_1: "Symbol文档",
    advice_button4_1_link:"https://docs.symbol.dev/concepts/overview.html",
    advice_button4_2: "开始使用SDKs",
    advice_button4_2_link:"https://learn.en.symbol-community.com/",
    advice_title5: "关于本网站",
    advice_body5:"该网站由社区志愿者维护。修改内容和增加文章需要通过 GitHub 或门户网站进行修改。该网站需要来自 Symbol 地址的签名才能登录。如需更多信息，请联系 'Symbol/NEM营销部门'。",
    advice_button5_1: "Community",
    advice_button5_1_link:"/community",
    advice_button5_2: "Symbol WEB GitHub",
    advice_button5_2_link:"https://github.com/ymuichiro/symbol_web",
    advice_button5_3: "Symbol门户网站",
    advice_button5_3_link:"https://cms.symbol-community.com/",
    section_search_article: '搜索文章',
    search_bar_placeholder: '请输入您要搜索的内容',
    no_articles: '没有找到相关文章',
  },
};

export default zh;
