'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	Temperatura: String,
	Estado: Number,
	Online: Number
	/*name: String,
	description: String,
	category: String,
	year: Number,
	langs: String,
	image: String*/
});

module.exports = mongoose.model('Project', ProjectSchema);
// projects  --> guarda los documents en la coleccion