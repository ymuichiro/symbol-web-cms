const path = require('path');

module.exports = ({ env }) => {
  console.log("-".repeat(5), "connecting database", "-".repeat(5));
  if (env("STRAPI_NODE_ENV") === "production") {
    console.log("mode", env("STRAPI_NODE_ENV"), "mysql");
    // mysql
    return {
      connection: {
        client: "mysql",
        connection: {
          host: env("DATABASE_HOST", "127.0.0.1"),
          port: env.int("DATABASE_PORT", 3306),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USER", "strapi"),
          password: env("DATABASE_PASS", "strapi"),
          ssl: {
            rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
          },
        },
        debug: false,
      },
    }
  } else {
    console.log("mode", env("STRAPI_NODE_ENV"), "sqlite");
    // sqlite
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      },
    }
  }
};
