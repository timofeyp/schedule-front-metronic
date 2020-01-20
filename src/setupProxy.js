const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://10.10.229.243:4001',
      changeOrigin: true,
    }),
  );
};
