var mongo = require('../db/mongoose');
var mongoDB = mongo.db;
var mongoose = mongo.mongoose;
var Schema = mongoose.Schema;

/**
  用户信息文档结构
**/
var UserSchema = new Schema({
  username: {
    type: String
  },
  nickname: String,
  password: String,
  registDate: {
    type: Date,
    default: Date.now
  },
  lastLoginDate: {
    type: Date
  },
  email: String
});

var UserModel = mongoDB.model("user", UserSchema, "users");

module.exports.UserModel = UserModel;