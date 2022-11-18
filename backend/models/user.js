
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var ProjectSchema = Schema({
	Username: String,
	Password: String,
	Email : String
   
	
});*/
var user = {
    username : String,
    rol : Number,
    estado : Number,
    online : String
    
}
var ProjectSchema = Schema({
	Username: user,
	Password: String,
	Email : String
   
	
});


module.exports = mongoose.model('Users', ProjectSchema);