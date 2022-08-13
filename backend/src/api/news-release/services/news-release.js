'use strict';

/**
 * news-release service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-release.news-release');
