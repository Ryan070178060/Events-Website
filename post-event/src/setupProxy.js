const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy /upload requests to https://events-website.onrender.com/upload
  app.use(
    '/upload',
    createProxyMiddleware({
      target: 'https://events-website.onrender.com',
      changeOrigin: true,
    })
  );

  // Proxy /addproduct requests to https://events-website.onrender.com/addproduct
  app.use(
    '/addproduct',
    createProxyMiddleware({
      target: 'https://events-website.onrender.com',
      changeOrigin: true,
    })
  );

  // Add more proxy routes as needed
};
app.use(
    '/allproduct',
    createProxyMiddleware({
      target: 'https://events-website.onrender.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/removeproduct',
    createProxyMiddleware({
      target: 'https://events-website.onrender.com',
      changeOrigin: true,
    })
  );