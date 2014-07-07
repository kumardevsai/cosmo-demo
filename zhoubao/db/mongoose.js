var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'zhoubao');
module.exports.db = db;
module.exports.mongoose = mongoose;