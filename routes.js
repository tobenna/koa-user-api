var router = require('koa-router')();
var controller = require('./controllers/users-controller');

router.get('/users/:id', controller.show);

router.get('/users/', controller.index);

router.post('/users/', controller.create);

router.put('/users/:id', controller.update);

router.get('/users/search', controller.search);

router.delete('/users/:id', controller.delete);


module.exports = router.routes();
