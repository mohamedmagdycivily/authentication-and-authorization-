module.exports = {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'auth',
      description: 'API for the auth project',
      contact: {
        name: 'mohamed magdy',
        url: '',
        email: 'mohamedmagdycivily@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v0/',
      },
    ],
    // tags: [
    //   {
    //     name: 'User',
    //     description: 'everything about user',
    //   },
    // ],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    security: [{ Bearer: [] }],
  };
  