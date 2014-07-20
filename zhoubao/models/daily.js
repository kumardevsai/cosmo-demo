var mongo = require('../db/mongoose');
var mongoDB = mongo.db;
var mongoose = mongo.mongoose;
var Schema = mongoose.Schema;

/**
  用户信息文档结构
**/
var DailySchema = new Schema({
  name: {
    type: String
  },
  content: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.ObjectId
  },
  dailyCataId: {
    type: Schema.ObjectId
  }
});

var DailyModel = mongoDB.model("daily", DailySchema, "dailys");

module.exports.DailyModel = DailyModel;