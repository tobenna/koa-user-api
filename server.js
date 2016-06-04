var koa = require('koa');
var app = module.exports = koa();
var routes = require('./routes');

app.use(routes);
