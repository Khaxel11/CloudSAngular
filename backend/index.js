'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

/* express*/
const express = require('express');
//const app = express();
let cors = require('cors');
const bodyparser = require ('body-parser');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
/*express*/ 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cloud')
    .then(()=>{
        console.log("Conexion OK");

        // Creacion del servidorc
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3700");
        });
    }).catch(err => console.log(err));