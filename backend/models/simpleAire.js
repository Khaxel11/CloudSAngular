'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	deviceID : String,
    userID : String,
    modelo : String
	
});

module.exports = mongoose.model('Aire', ProjectSchema);