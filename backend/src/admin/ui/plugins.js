
// To override this file create a plugins-dev.js one and copy the content of the plugin.js one.
// When starting the app the script will copy the plugins-dev.js into this one instead.
// After:
// import contentTypeBuilder from '../../../content-type-builder/admin/src';
// import email from '../../../email/admin/src';
// import upload from '../../../upload/admin/src';
// import i18N from '../../../../plugins/i18n/admin/src';
// import usersPermissions from '../../../../plugins/users-permissions/admin/src';

// Before:
import contentTypeBuilder from '@strapi/plugin-content-type-builder/admin/src';
import email from '@strapi/plugin-email/admin/src';
import upload from '@strapi/plugin-upload/admin/src';
import i18N from '@strapi/plugin-i18n/admin/src';
import usersPermissions from '@strapi/plugin-users-permissions/admin/src';

const plugins = {
  'content-type-builder': contentTypeBuilder,
  'email': email,
  'upload': upload,
  'i18n': i18N,
  'users-permissions': usersPermissions,
};
  
export default plugins;
