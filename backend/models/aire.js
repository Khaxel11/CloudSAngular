'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	Temperatura: String,
	Estado: Number,
	Online: Number
	
});

module.exports = mongoose.model('aire', ProjectSchema);