var express = require('express');
var router = express.Router();

var IndexController = require('../controls/index');
var UserController = require('../controls/user');
var HolderController = require('../controls/holder');
var DailyCataController = require('../controls/dailyCata');
var DailyController = require('../controls/daily');

/* GET home page. */
router.get('/', IndexController.index);

router.get('/login', IndexController.login);

router.get('/regist', IndexController.regist);

router.get('/work', IndexController.work);

router.get('/me', IndexController.me);

router.get('/logout', IndexController.logout);

router.post('/regist-user', UserController.registUser);

router.post("/login-user", UserController.userLogin);

router.post("/holder-add", HolderController.add);

router.get("/holder-list", HolderController.list);

router.get("/holder-detail" , HolderController.detail);

router.post("/dailyCata-add", DailyCataController.add);

router.get("/dailyCata-list", DailyCataController.list);

router.get("/dailyCata-detail" , DailyCataController.detail);

router.post("/daily-add", DailyController.add);

router.get("/daily-list", DailyController.list);

router.get("/daily-detail" , DailyController.detail);

router.get("/daily-add" , DailyController.addDispacher);

module.exports = router;