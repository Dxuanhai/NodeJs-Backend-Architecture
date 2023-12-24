const dev = {
  app: {
    port: process.env.DEV_PORT_APP || 3052,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "dbDEV",
  },
};
const production = {
  app: {
    port: process.env.PRO_PORT_APP || 3000,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "dbProduction",
  },
};

const config = { dev, production };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
