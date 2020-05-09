var mongoose = require("mongoose");
//------------------------defining models
var Schema = mongoose.Schema;
 
var url159 = new Schema({
  userid: {type:String,required:true,trim:true},
  previousurl: {type:String, required:true},
  newurl: {type:String, required:true},
  count:{type:Number}
},{timestamps:true});


var yahoo159 = mongoose.model("urls",url159);

module.exports = yahoo159;
