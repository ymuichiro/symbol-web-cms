import ja from './_ja';

// prettier-ignore
const en: typeof ja = {
  index: {
    title_message: 'Welcome to Symbol & NEM. Empowering the world with robust and easy-to-use Web3 infrastructure!',
    history_title1: 'A public blockchain inspired by NEM',
    history_body1: "After the original NEM blockchain launch in 2014, redevelopment under the codename 'Catapult' began with the intention of improving performance, enhancing functionality, and the refining the consensus algorithm. In 2021, 'Symbol' was launched as a distinct blockchain using the completed 'Catapult' codebase. Several months after launch, a successful 'community hard fork' across both NEM and Symbol established a new path forward; this new direction includes an emphasis on engaged community, genuine decenteralization, and a vision of a novel protocol layer facilitating universal cross-chain collaboration that would eventually emerge from NEM and Symbol",
    history_body1_Button: "What is NEM?",
    functionary_section_title: "Advanced Functionality",
    functionary_title1: "Robustness and flexibility",
    functionary_subtitle1: 'Solid plugin-based architecture designed for maximal extensibility',
    functionary_body1: 'Symbol has rock solid interfacing and excellent extensibility through its plugin-based architecture. Developers can easily combine and utilize advanced plug-in interfaces inclidng a Command Line Interface, public SDK, and REST APIs. Developers do not have to start from scratch, and off-chain application developement avoids immutable bugs, exposed code, and countless hours spent verifying and debugging before deployment. ',
    functionary_title2: 'Advanced transaction logic',
    functionary_subtitle2: 'Built-in multisignature, support for complex multi-part transactions, and numerous other innovations',
    functionary_body2: "'Aggregate transactions' are a key differentiator for the Symbol blockchain. These allow the bundling of multiple transactions from one or more address with one or more signatures required before the transaction(s) can be processed. These transactions have a 48 hour signing window before timing out. The transaction remains in a partial or 'bonded' state until it is finalized, effectively leaving it cached on the blockchain until approval or timeout. As a built-in feature it can be easily leveraged by end users or implemented in complex technical solutions. The Symbol blockchain natively facilitates complex multi-part transactions without the need for cumbersome smart contracts.",
    functionary_title3: 'Easy/convenient',
    functionary_subtitle3: "Symbol simplifies the issuance of various token types and namespaces with its no-code development blockchain platform",
    functionary_body3: "Symbol allows developers and users to easily issue their own tokens (assets), called 'mosaics', in addition to its native currency 'symbol:xym', in the Symbol chain. Mosaics can be sent and received via transactions in the same way as native currency XYM and can facilitate multiple use cases on the Symbol blockchain, i.e. a 'unique currency', centerally managed 'certificate' issuance, Non-Fungible Tokens, and so on. The 'namespace' features allow the labeling of mosaics and accounts as well as metadata, much like domain names on the Internet.",
    secure_section_title: "Supporting Safe Transactions",
    secure_title1: 'Built-in security for multisig signatures',
    secure_body1: "Native support for multi-signature accounts allows up to 25 signatories and up to 3 signatory levels. The combination of multi-signature and multi-level logic approach enables extreme flexibility in approval logic. In the event of one signatory losing their private key or requiring removal, access to the multisig account can be adjusted with the signatures of all the other co-signatories. This facilitates the design of security and flexible operation of the blockchain implementation according to the user's practice.",
    secure_title2: 'Provide a powerful, stable, secure, and fast solid network with a Four-Layered Architecture',
    secure_body2: "The Symbol blockchain is built on a multi-layered node architecture. PeerNodes maintains the network, decentralizing the Symbol chain and recording its transactions and history.  APINodes interface with PeerNodes and wallets for transaction requests, history, and the generation of new blocks. API nodes also include Rest Gateways, which facilitate a wide variety of external requests from wallets and custom-built solutions. In addition to REST API gateways, Nodes also include a robust Command Line Interface that helps facilitate localized solutions and plugins. The Symbol Client consists of the wallet and the SDK; it is largely modularised to encourage innovation, ensure security, and simplify updates.",
    secure_title3: 'PoS+ consensus algorithm',
    secure_body3: "Consensus algorithms are shared or mutually agreed upon by all participating nodes in a network, and is used in the generation of new blocks. In Symbol, the PoS+ (Proof of Stake Plus) consensus algorithm is adopted as an improved version of NEM's PoI (Proof of Importance) algorithm. Symbol's PoS+ mechanism allows nodes to periodically 'Harvest' new blocks proportionate to their 'importance'. The PoS+ mechanism considers not only 'amount of staking', but it also promotes the ecosystem’s health by rewarding participants based on their activity score which are counted through 'total fees used by the wallet' and 'number of times of reward in the past', using to discourage the continued concentration of wealth in certain accounts. The POS+ algorithm avoids unnecessary energy waste, and is much more environmentally friendly than the Proof of Work algorythms that secure many blockchains. Node operators and delegators are rewarded for their contribution to the maintainance of the chain via harvesting rewards. These rewards draw from a signifigant pool of XYM allocated for this purpose, and follow a declining reward rate schedule linked to Bitcoin's block reward model.",
    easy_section_title: 'Smooth integration into existing systems',
    easy_section_body: 'The core contributors behind NEM learned countless lessons along the way, and these lessons have heavily influenced Symbol. Symbol was designed with usability and extensibility in mind; while wallets profoundly enable the average user, the boundless extensibility provided by the SDK, CLI, and Rest API effectively shatter barriers to development. You do not need to learn cryptography nor a specific programming language in order to profoundly interact with the blockchain; even junior developers and hobbiests can build with ease.',
    easy_section_button: "Getting Started with SDKs",
    news_title: 'News Release',
    start_title: 'Start Symbol',
    start_card1: 'How to Choose a Wallet',
    start_card1_link:"/docs/2",
    start_card2: 'Things to watch out for',
    start_card2_link:"/docs",
    start_card3: 'Where to consult when you need help',
    start_card3_link:"/community",
    start_card4: 'Information for developers',
    start_card4_link:"/docs",
    end_message_title: "Let's go explorer",
    end_message_body: "Check transaction status",
    about_site_management_title: "About Us",
    about_site_management_body: "Symbol Community Web is run by members of the community. Meet the team behind the site.",
  },
  about: {
    page_title: 'About Us',
    page_title_description: "Symbol Community WEB has a team that maintains and develops the site",
    body_markdown: `
## About the Symbol Community Web Team
We are a team born out of a community that supports the growth of Symbol/NEM. The team is open to everyone. The site is open to the public as an open source resource and anyone can contribute. We realize the following goals in developing and maintaining Symbol Community Web.

## Goals
We have the following goals
- New users can safely experience the blockchain
- Help new users get started with Symbol/NEM
- Bring up-to-date information about Symbol/NEM
- Connect new users with those already active
- Showcase resources created by the community
- Create an opportunity to face social issues with blockchain

## Principles and Philosophy
### Symbol Community Web provides a gateway to Symbol/NEM
Symbol Community Web provides an opportunity for newcomers to learn what Symbol/NEM is all about. It helps new users onboard by providing them with information that is relevant to them. We will integrate and make it easy to find information about people and tools working everywhere. This site is not just for existing Symbol/NEM users.

We will grow with people, receiving feedback daily so that we can deliver relevant information to new users around the world.

### 2. growing with people
Symbol/NEM and the ecosystem that uses it are constantly growing and changing. In order to keep up with change, Symbol Web is open source and open to suggestions and requests for modifications. In addition, the majority of the site's content is separated from the source code so that it can flexibly adapt to changes. This mechanism allows non-technical people to contribute to the modification of the site and the creation of articles.

If you would like to help us by suggesting changes or contributing to the site, [Discord](https://discord.gg/A8MRq5Vuvt) [Portal](https://cms.symbol-community.com/admin/auth/login)

## Contributions
If you would like to contribute an article to Symbol Web, please visit our Discord. If you are writing an article in advance, please follow the style guide below. 1.

1. submit a title, a summary of 30 words or less, and a header image. 
2. File format: .md (markdown). 
3. the following formatting is acceptable
4. h1-6, bold, italic, underline, strikethrough, bullet/numberlist, code, image, link, quote. 
5. Image files must be stored on this server. 
6. Continuing authors may pay out their accounts and change them directly. 
7. please be careful about copyright when you use free images.

How to login to ## Portal
To edit or add articles on Symbol Community Web, you need to login to the Portal, where your account is authenticated by your Symbol Blockchain account instead of the traditional ID and PW. To access the Portal, you will need the following: 1.

1. an active Symbol address
2. an [SSS Extention](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan?hl=ja)

In addition, to allow your Symbol address to access the Portal, you will need to add privileges from an existing Contributor. Please contact [Discord](https://discord.gg/JTxYPVTf) if you would like to add privileges.
If you would like to edit any other pages other than articles, please feel free to send us a pull request via [GitHub](https://github.com/ymuichiro/symbol_web).
`
  },
  news: {
    page_title: 'News Release',
    page_title_description: "Topics from Symbol/NEM will be posted",
    no_articles: 'No article was found',
  },
  community: {
    page_title: 'Community',
    section_title_release: 'News from the Community',
    page_title_description: "Follow the sites and accounts that are disseminating information about Symbol and NEM!",
    no_articles: 'No article was found',
    community_introduce_section1: "Chat",
    community_introduce_section2: "Twitter",
    community_introduce_section3: "Blog & Forum"
  },
  docs: {
    page_title: 'document',
    page_title_description: "Learn about Symbol/NEM",
    section_title_wellcom: 'For first time visitor',
    section_title_wellcom_body: "If you are new to blockchain, please be sure to check it out.",
    advice_title1: 'Do not share your mnemonic and private key with anyone.',
    advice_body1: "Never give the private key or mnemonic of the wallet containing your assets to a third party, even if they ask. This is a form of transferring all access to your assets to the other party, and you risk theft.",
    advice_button1_1: "Learn about mnemonic",
    advice_button1_1_link: "https://docs.symbol.dev/concepts/cryptography.html#hd-wallets-and-mnemonics",
    advice_button1_2: "Learn about private key",
    advice_button1_2_link: "https://docs.symbol.dev/concepts/account.html#private-key",
    advice_title2: "Always keep backups of mnemonics and private keys",
    advice_body2: "If lost, they cannot be reissued under any circumstances. Please be sure to keep a backup copy of your tokens, as you will lose access to your tokens permanently.",
    advice_button2_1: "How to Obtain Backup",
    advice_button2_1_link:"https://docs.symbol.dev/guides/account/creating-an-account.html#method-01-using-the-desktop-wallet",
    advice_title3: "Always 'sign' the transaction before you do it.",
    advice_body3:"In a blockchain, a transaction is signed when it is approved. By signing, the transaction is approved and executed. Because transactions can be sent by you or by the other party, there have been cases where a malicious third party has sent a transaction to steal your assets. Always check to make sure that the transaction is not dangerous before signing it!",
    advice_button3_1: "Learn about past cases",
    advice_button3_1_link:"https://docs.symbol.dev/guides/account/scams-and-security.html",
    advice_title4: "For developers of blockchain-related applications",
    advice_body4:"This site is dedicated to those who are just getting started with Symbol/NEM and blockchain and to disseminate various news. If you are a developer or creator and are looking for information on how to get involved, please click on the link below to access the site in more detail. Or post your questions in the community chat room.",
    advice_button4_1: "Symbol Documentation",
    advice_button4_1_link:"https://docs.symbol.dev/concepts/overview.html",
    advice_button4_2: "Getting Started with SDKs",
    advice_button4_2_link:"https://github.com/xembook/quick_learning_symbol",
    advice_title5: "About this Site",
    advice_body5:"This site is maintained by volunteers from the community. Modification of content and addition of articles requires modification through GitHub or the portal site. The portal requires a signature from a Symbol address for login. For more information, please contact the 'Symbol/NEM Marketing Department'.",
    advice_button5_1: "Symbol/NEM Marketing Department",
    advice_button5_1_link:"https://discord.gg/JTxYPVTf",
    advice_button5_2: "Symbol WEB GitHub",
    advice_button5_2_link:"https://github.com/ymuichiro/symbol_web",
    advice_button5_3: "Symbol WEB Portal",
    advice_button5_3_link:"https://cms.symbol-community.com/",
    section_search_article: 'Search Articles',
    search_bar_placeholder: 'Please enter what you want to search for',
    no_articles: 'No article was found',
  },
};

export default en;
