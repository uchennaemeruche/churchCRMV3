module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql2",
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "churchcrm"),
        username: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
});
