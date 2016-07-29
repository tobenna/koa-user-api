var router = require('koa-router')();
var controller = require('./controllers/users-controller');
var API_URL = '/api/v1';

router.get(API_URL + '/users/:id', controller.show);

router.get(API_URL + '/users/', controller.index);

router.post(API_URL + '/users/', controller.create);

router.patch(API_URL + '/users/:id', controller.update);

router.get(API_URL + '/users/search', controller.search);

router.delete(API_URL + '/users/:id', controller.delete);


module.exports = router.routes();
