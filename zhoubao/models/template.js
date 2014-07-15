var mongo = require('../db/mongoose');
var mongoDB = mongo.db;
var mongoose = mongo.mongoose;
var Schema = mongoose.Schema;

/**
  用户信息文档结构
**/
var TemplateSchema = new Schema({
  name: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.ObjectId
  }
});

var TemplateModel = mongoDB.model("template", TemplateSchema, "templates");

module.exports.TemplateModel = TemplateModel;