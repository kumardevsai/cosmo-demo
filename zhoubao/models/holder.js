var mongo = require('../db/mongoose');
var mongoDB = mongo.db;
var mongoose = mongo.mongoose;
var Schema = mongoose.Schema;

/**
  用户信息文档结构
**/
var HolderSchema = new Schema({
  name: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Types.ObjectId
  }
});

var HolderModel = mongoDB.model("holder", HolderSchema, "holders");

module.exports.HolderModel = HolderModel;