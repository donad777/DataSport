const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sport',
      version: '1.0.0',
      description: 'Dự án buôn bán đồ thể thao và phụ kiện',
    },
  },
  apis: ['./routes/*.js'], // Đường dẫn đến các file định nghĩa API
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
