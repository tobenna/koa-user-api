var koa = require('koa');
var logger = require('koa-logger');
var app = module.exports = koa();
var routes = require('./routes');

var PORT_NUMBER = 3000;
app.use(logger());
app.use(routes);
app.listen(PORT_NUMBER);

console.log("Listening on port " + PORT_NUMBER);
