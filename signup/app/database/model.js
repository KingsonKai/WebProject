var mongoose = require('mongoose');
var Schema = mongoose.Schema;
user = {
		name : String,
		password : String,
		id : String,
		email : String,
		phone : String
}
var User = mongoose.model("user",new Schema(user));
var _getModel = function(type){ 
	return mongoose.model(type);
};
module.exports = { 
	getModel: function(type){ 
		return _getModel(type);
	}
};