var mongoose = require("mongoose");
//------------------------defining models
var Schema = mongoose.Schema;
 
var user = new Schema({
  name: {type:String,required:true,trim:true},
  email: {type:String, required:true},
  password: {type:String, required:true},
},{timestamps:true});

var yahoo = mongoose.model("users",user);

module.exports = yahoo;
