const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Settings API',
    version: '1.0.0',
    description: 'API documentation for managing user settings',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./index.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };