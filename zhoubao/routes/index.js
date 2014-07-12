var express = require('express');
var router = express.Router();
var IndexController = require('../controls/index');
var UserController = require('../controls/user');

/* GET home page. */
router.get('/', IndexController.index);

router.get('/login', IndexController.login);

router.get('/regist', IndexController.regist);

router.get('/work', IndexController.work);

router.get('/me', IndexController.me);

router.get('/logout', IndexController.logout);

router.post('/regist-user', UserController.registUser);

router.post("/login-user", UserController.userLogin);

module.exports = router;