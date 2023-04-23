'use strict';

/**
 * poll router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::poll.poll');
