const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://flight.apicollection.my.id",
      changeOrigin: true,
    })
  );
};
