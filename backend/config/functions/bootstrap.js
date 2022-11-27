'use strict';

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

// Create the new localization
async function setInternationalization(newLocalizations) {
  for (const l of newLocalizations) {
    await strapi.query('plugin::i18n.locale').create({
      data: {
        name: l.name,
        code: l.code,
      },
    });
  }
}

async function importSeedData() {
  await setPublicPermissions({
    'community-release': ['find', 'findOne'],
    'news-release': ['find', 'findOne'],
    document: ['find', 'findOne'],
    space: ['find', 'findOne'],
  });
  await setInternationalization([
    { name: 'Japanese (Japan) (ja-JP)', code: 'ja-JP' },
    { name: 'Russian (Russia) (ru-RU)', code: 'ru-RU' },
    { name: 'Korean (ko)', code: 'ko' },
  ]);
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();
  console.log('-'.repeat(5), 'Run Strapi bootstrap', '-'.repeat(5));
  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  }
  console.log('bootstrap configured');
  console.log('-'.repeat(5), 'end', '-'.repeat(5));
};
