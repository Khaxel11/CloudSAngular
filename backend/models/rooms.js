'use strict'

var mongoose = require('mongoose');
const { interval } = require('rxjs');

var Schema = mongoose.Schema;

var Programability = {
    onat: String,
    offat: String,
    online : String
}
var device = {
    id : String,
    state : Number,
    temperature : Number,
    scale : String,
    lastChange : String,
    programability : Programability
}
var rooms = {
    place : String,
    placeState : Number,
    devices : device 
}
var ProjectSchema = Schema({
    userID : String,
    rooms : rooms
});

module.exports = mongoose.model('rooms', ProjectSchema);

