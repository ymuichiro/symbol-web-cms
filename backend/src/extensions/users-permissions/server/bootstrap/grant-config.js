'use strict';

module.exports = baseURL => ({
    symbol: {
        enabled: true,
        icon: 'envelope',
    },
    email: {
        enabled: true,
        icon: 'envelope',
    },
    discord: {
        enabled: false,
        icon: 'discord',
        key: '',
        secret: '',
        callback: `${baseURL}/discord/callback`,
        scope: ['identify', 'email'],
    },
    facebook: {
        enabled: false,
        icon: 'facebook-square',
        key: '',
        secret: '',
        callback: `${baseURL}/facebook/callback`,
        scope: ['email'],
    },
    google: {
        enabled: false,
        icon: 'google',
        key: '',
        secret: '',
        callback: `${baseURL}/google/callback`,
        scope: ['email'],
    },
    github: {
        enabled: false,
        icon: 'github',
        key: '',
        secret: '',
        callback: `${baseURL}/github/callback`,
        scope: ['user', 'user:email'],
    },
    microsoft: {
        enabled: false,
        icon: 'windows',
        key: '',
        secret: '',
        callback: `${baseURL}/microsoft/callback`,
        scope: ['user.read'],
    },
    twitter: {
        enabled: false,
        icon: 'twitter',
        key: '',
        secret: '',
        callback: `${baseURL}/twitter/callback`,
    },
    instagram: {
        enabled: false,
        icon: 'instagram',
        key: '',
        secret: '',
        callback: `${baseURL}/instagram/callback`,
        scope: ['user_profile'],
    },
    vk: {
        enabled: false,
        icon: 'vk',
        key: '',
        secret: '',
        callback: `${baseURL}/vk/callback`,
        scope: ['email'],
    },
    twitch: {
        enabled: false,
        icon: 'twitch',
        key: '',
        secret: '',
        callback: `${baseURL}/twitch/callback`,
        scope: ['user:read:email'],
    },
    linkedin: {
        enabled: false,
        icon: 'linkedin',
        key: '',
        secret: '',
        callback: `${baseURL}/linkedin/callback`,
        scope: ['r_liteprofile', 'r_emailaddress'],
    },
    cognito: {
        enabled: false,
        icon: 'aws',
        key: '',
        secret: '',
        subdomain: 'my.subdomain.com',
        callback: `${baseURL}/cognito/callback`,
        scope: ['email', 'openid', 'profile'],
    },
    reddit: {
        enabled: false,
        icon: 'reddit',
        key: '',
        secret: '',
        state: true,
        callback: `${baseURL}/reddit/callback`,
        scope: ['identity'],
    },
    auth0: {
        enabled: false,
        icon: '',
        key: '',
        secret: '',
        subdomain: 'my-tenant.eu',
        callback: `${baseURL}/auth0/callback`,
        scope: ['openid', 'email', 'profile'],
    },
    cas: {
        enabled: false,
        icon: 'book',
        key: '',
        secret: '',
        callback: `${baseURL}/cas/callback`,
        scope: ['openid email'], // scopes should be space delimited
        subdomain: 'my.subdomain.com/cas',
    },
});
