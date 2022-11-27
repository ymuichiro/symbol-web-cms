'use strict';
const path = require('path');
const strapiCacheSrcPath = path.resolve(__dirname, '../../.cache/admin/src');
/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/admin\/src\/(.*).js/, (resource) => {
      if (resource.createData.resource) {
        const replacedFilePath = resource.createData.resource.replace(
          strapiCacheSrcPath,
          path.resolve(__dirname, 'ui')
        );
        if (replacedFilePath.endsWith('.js')) {
          resource.createData.resource = replacedFilePath;
        }
      }
    })
  );

  return config;
};
