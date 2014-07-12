var crypto = require('crypto');

var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;

var TemplateDoc = require('../models/template');
var TemplateModel = TemplateDoc.TemplateModel;

/**
	模板控制
**/
var TemplateService = (function() {

	// 添加模板
	function add(template, callback) {};

	return {
		add: add
	};
}());

module.exports = TemplateService;