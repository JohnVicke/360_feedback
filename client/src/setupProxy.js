const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api/advertisers/',
        createProxyMiddleware({
            target: 'http://localhost:8000',
        })
    );
    app.use(
        '/api/ads/',
        createProxyMiddleware({
            target: 'http://localhost:8001',
        })
    );
};
