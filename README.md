[![Netlify Status](https://api.netlify.com/api/v1/badges/60b824ed-16b6-4b84-a783-086c0e3e2fb5/deploy-status)](https://app.netlify.com/sites/symbol-web/deploys)

# Introduction

Symbol's information will be consolidated and a site will be built for newcomers and outsiders to come into contact with it.
Since updating of articles cannot be maintained in a centralized manner, a CMS will be implemented to allow community members to update articles.

## Structure

### Front-end

- Next.js
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

## About Domain Name

The domain applied to Github Pages is currently held by [ふぁー](https://twitter.com/faunsu19000/photo).
When it is necessary to transfer the domain, we will discuss and deal with the matter.
The same applies to VM contracts.

## Cooperation for this project

Any help is welcome, including programmers, designers, ideation, publicity, and funding by other harvesters.
If you are interested in helping to make Symbol a success, please contact us at [ふぁー](https://twitter.com/faunsu19000/photo).
We are also discussing this issue on [Discord](https://discord.com/channels/856325968096133191/999479496845561946).
