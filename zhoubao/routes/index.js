var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '周报填报' , func : 'index' });
});

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: '登录' , func : 'login' });
});

/* GET home page. */
router.get('/regist', function(req, res) {
  res.render('regist', { title: '注册' , func : 'regist' });
});
module.exports = router;
