'use strict';

/**
 * poll service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::poll.poll');
