'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateChange = {
    time : String,
    by : String,
    state : Number,
    rol : Number
}
var temperatureChange = {
    time : String,
    by : String,
    temperature : Number,
    rol : Number
}

var changes = {
    temperatureChange : temperatureChange,
    stateChange : stateChange
}

var days = {
    day : Number,
    changes : changes
    
}

var months = {
    month:Number,
    days : days
}

var years = {
    year : String,
    months : months
}

var changeLog = {
    years : years
    
}


var devicess = {
    idDevice : String,
    changeLog : changeLog
}

var ProjectSchema = Schema({
	idUser: String,
	devicess : devicess,
	
});

module.exports = mongoose.model('analytics', ProjectSchema);