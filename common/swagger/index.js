const conf = require('./swagger-conf');
const user = require('../../server/users/docs/public-user-docs.json');
const definitions = require('./swagger-definitions');
const swaggerDocs = {
  ...conf,
  paths: {
    ...user,
  },
};
swaggerDocs.components.schemas = {
  ...definitions,
};
module.exports = swaggerDocs;
