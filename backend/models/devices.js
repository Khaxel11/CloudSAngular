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
    programability : Programability
}
var ProjectSchema = Schema({
    userID : String,
    devices : device 
});

module.exports = mongoose.model('devices', ProjectSchema);



	//_id : String,

// devices : [
    //     {
    //         id : String,
    //         state : Number,
    //         temperature: Number,
    //         scale : String,
    //         Programability : {
    //             onat: String,
    //             offat: String,
    //             online : String
    //         }
    //     }
    // ]