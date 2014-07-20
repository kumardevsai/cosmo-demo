var mongo = require('../db/mongoose');
var mongoDB = mongo.db;
var mongoose = mongo.mongoose;
var Schema = mongoose.Schema;

/**
  用户信息文档结构
**/
var DailyCataSchema = new Schema({
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

var DailyCataModel = mongoDB.model("dailyCata", DailyCataSchema, "dailyCatas");

module.exports.DailyCataModel = DailyCataModel;