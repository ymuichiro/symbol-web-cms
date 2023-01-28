[![Netlify Status](https://api.netlify.com/api/v1/badges/3048a429-4241-4779-81ab-cdcbea31b4a3/deploy-status)](https://app.netlify.com/sites/symbol-web/deploys)

# Introduction

Symbol's information will be consolidated and a site will be built for newcomers and outsiders to come into contact with it.
Since updating of articles cannot be maintained in a centralized manner, a CMS will be implemented to allow community members to update articles.

## Structure

### Front-end

- Vite
- mui-material
- i18n

### Back-end

- strapi
- symbol-sdk（authn）

## Build&Deploy

### Front-end

Deploy to Netlify; deploys and updates automatically when main branch is updated.

### Back-end

- After committing to GitHub, the container is created by GitHub Actions and stored in the GitHub Container Registry
- Back-end is running as a docker container; login to the VM and update the container

## ドメインについて

The domain applied to Github Pages is currently held by [ふぁー](https://twitter.com/faunsu19000/photo).
When it is necessary to transfer the domain, we will discuss and deal with the matter.
The same applies to VM contracts.

## 本プロジェクトへの協力について

Any help is welcome, including programmers, designers, ideation, publicity, and funding by other harvesters.
If you are interested in helping to make Symbol a success, please contact us at [ふぁー](https://twitter.com/faunsu19000/photo).
We are also discussing this issue on [Discord](https://discord.com/channels/856325968096133191/999479496845561946).

## Branch Strategy

Please use future/{work name} when you do your own work.

| main        | staging             | future/{work name} |
| ----------- | ------------------- | ------------------ |
| for release | for staging release | working branch     |
