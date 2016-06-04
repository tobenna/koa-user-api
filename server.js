var koa = require('koa');
var logger = require('koa-logger')
var app = module.exports = koa();
var routes = require('./routes');

app.use(logger());
app.use(routes);
app.listen(3000);

console.log("Listening on port 3000");
