var koa = require('koa');
var app = module.exports = koa();
var data = require('./models/user');
var routes = require('./routes');

app.use(routes);
