# GithubActions for Symbol DAO

Symbolコミュニティによるウェブサイト作成などに使用するGithubActions

## Usage

StrApi
Settings -> ContentManager -> User<br>
[Create New Entry]
role を bot にする<br>

`actions/const.js`
``` javascript
const api_url = "API_URL";
```

Github -> Repository -> Settings -> Secret -> Actions<br>
[New Repository Secret]

- 1<br>
Name: ACTIONS_TOKEN<br>
Value: Githubのアクセストークン

- 2<br>
Name: BOT_ID<br>
Value: Botのアドレス

- 3<br>
Name: BOT_PASSWORD<br>
Value: Botのパスワード


