'use strict';

/**
 * community-release service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::community-release.community-release');
