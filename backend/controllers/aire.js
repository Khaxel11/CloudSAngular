'use strict'

var aire = require('../models/aire');
var fs = require('fs');
var path = require('path');
const nodeMailer = require('nodemailer');
var user = require('../models/user');
const User = require('../models/user');
var devices = require('../models/devices');
var air = require('../models/simpleAire');
var onedevice = require('../models/devices');
//var analytic = require('../models/analytics');
const { param } = require('../app');
const { cwd } = require('process');
const { on } = require('events');
const analytics = require('../models/analytics');
const rooms = require('../models/rooms');
const { mongo } = require('mongoose');


var controller = {
	
	sendCorreo:  (req=request, resp=response) =>{
		let body = req.body;
	
		let config = nodeMailer.createTransport({
			host: 'smtp.gmail.com',
			post: 587,
			auth:{
				
			}
	
		})
		const opciones = {
			from: 'IoT',
			subjet: body.asunto,
			to: body.email,
			text: body.mensaje,
			html: body.html
		};
		
		config.sendMail(opciones, function(error,result){
			if (error) return resp.json({ok:false, msg:error});
	
			return resp.json({
				ok: true,
				msg:result
			});
	
		});
	},


	home: function(req, res){
		return res.status(200).send({
			message: 'Soy aire'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el metodo o accion test del controlador de project"
		});
	},

	saveAire: function(req, res){
		var aire = new Aire();

		var params = req.body;
		aire.Temperatura = params.Temperatura;
		aire.Estado = params.Estado;
		aire.Online = params.Online;
		//aire.Password = params.Password;
		//aire.Telefono = params.Telefono;
		

		aire.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({project: projectStored});
		});
	},

	getAire: function(req, res){
		var aireId = req.params.id;

		if(aireId == null) return res.status(404).send({message: 'El proyecto no existe.'});

		aire.findById(aireId, (err, aire) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!aire) return res.status(404).send({message: 'El proyecto no existe.'});

			return res.status(200).send({
				aire
			});

		});
	},

	getAires: function(req, res){

		aire.find({}).exec((err, aires) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!aires) return res.status(404).send({message: 'No hay projectos que mostrar.'});

			return res.status(200).send({aires});
		});

	},
	getAireExist: function(req, res){
		var userId2 = req.params.id;
		var deviceID = req.params.idDevice;
		if(userId2 == null || deviceID == null) return res.status(404).send({message: 'El user no existe.'});

		air.findById(deviceID, (err, user) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!user) return res.status(404).send({message: 'El aire no existe.'});

			return res.status(200).send({
				user
			});

		});

	},
	putUserAire: function(req, res){
		var userId2 = req.params.id;
		var deviceID = req.params.idDevice;
		if(userId2 == null || deviceID == null) return res.status(404).send({message: 'El user no existe.'});

		
		air.findById(deviceID, (err, user) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!user) return res.status(404).send({message: 'El aire no existe.'});
			
			user.userID = userId2;
			if(res.status(200)){

			air.findByIdAndUpdate(deviceID, user, (err, modelUpdate)=>{
				if(err) return res.status(500).send({message: 'Error al actualizad estado'});
	
				if(!modelUpdate) return res.status(404).send({message: 'No existe estado'});
				
				return res.status(200).send({
					device : modelUpdate
				});
			})
		}
		});

	},
	saveUser: function(req, res){
		var user = new User();

		var params = req.body;
		user.Username = params.Username;
		user.Password = params.Password;
		user.Email = params.Email;
		
		user.save((err, projectStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

			return res.status(200).send({project: projectStored});
		});
	},
	getUser: function(req, res){
		var userId = req.params.id;

		if(userId == null) return res.status(404).send({message: 'El user no existe.'});

		user.findById(userId, (err, user) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!user) return res.status(404).send({message: 'El usuario no existe.'});

			return res.status(200).send({
				user
			});

		});
	},
	

	getDevices: function(req, res){
		var userId2 = req.params.id;
		//console.log(userId2);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});
			// return res.status(200).send({
			// 	data
			// });
			if(res.status(200)){
				//console.log(data.devices);
				return res.status(200).send(data.devices);
			}

		});
	},

	updateStates : function(req, res){
		var deviceId = req.param.id;
		var update = req.body;

		devices.findByIdAndUpdate(deviceId, update, (err, deviceUpdate)=>{
			if(err) return res.status(500).send({message: 'Error al actualizad estado'});

			if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
			
			return res.status(200).send({
				device : deviceUpdate
			});
		})
	},
	getDevicesFromUser: function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var oneDevice = {
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			programability : Programability
		}

		var userId2 = req.params.id;
		var device = req.params.device;
		//console.log(userId2);
		//console.log(device);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});
			// return res.status(200).send({
			// 	data
			// });
			if(res.status(200)){
				var one = JSON.stringify(data);
				var on1 = JSON.parse(one, oneDevice);
				//console.log(on1.devices[device]);
				//return res.status(200).send(data.devices);
				return res.status(200).send(on1.devices[device]);
			}
		
		});
	},

	//metodo para agregar un nuevo dispositivo al usuario modelo (DEVICES)
	putNewDeviceToUser: function(req, res){
		
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var oneDevice = {
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			programability : Programability
		}

		var userId2 = req.params.id;
		var newDeviceID = req.params.idDevice;
		var indexRoom = req.params.indexroom;
		var ProgramabilityNew = {
			onat: "00:00 am",
			offat: "00:00 am",
			online : 0
		}
		var newDevice = {
			id : newDeviceID,
			state : 0,
			temperature : 25,
			scale : "C",
			programability : ProgramabilityNew
		}
		//var device = req.params.device;
		//console.log(userId2);
		//console.log(device);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});
			// return res.status(200).send({
			// 	data
			// });
			if(res.status(200)){
				var one = JSON.stringify(data);
				var on1 = JSON.parse(one, oneDevice);
				var leng = on1.devices.length;
				console.log(leng);
				on1.devices[leng] = newDevice;
				//console.log(on1.devices[device]);
				//return res.status(200).send(data.devices);
				//return res.status(200).send(on1.devices[leng]);
				devices.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					// return res.status(200).send({
					// 	device : deviceUpdate
					// });
					if(res.status(200)){
						console.log("DEVICE AGREGADO");
					}
				})
				analytics.findById(userId2, (err, data) => {

					if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
		
					if(!data) return res.status(404).send({message: 'El usuario no existe.'});
		
					
					if(res.status(200)){
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
						
						var Analisis = {
							idUser: String,
							devicess : devices,
							
						};
						var mongoAnalisis = JSON.stringify(data);
						//console.log(mongoAnalisis);
						var obAnalisis = JSON.parse(mongoAnalisis,Analisis);
						var lent = obAnalisis.devicess.length;
						
						//console.log(lent);
						obAnalisis.devicess[lent] = obAnalisis.devicess[0];
						obAnalisis.devicess[lent].idDevice = newDeviceID;
						console.log(obAnalisis.devicess[lent]);
						analytics.findByIdAndUpdate(userId2, obAnalisis, (err, userUpdate)=>{
							if(err) return res.status(500).send({message: 'Error al actualizad estado'});
				
							if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
							//console.log(newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].temperatureChange);
							// return res.status(200).send({
							// 	Analisis : userUpdate
							// });
							if(res.status(200)){
								console.log("ANALISIS AGREGADO");
							}
						});
						//return res.status(200).send(obAnalisis.devicess[lent]);
					}
		
				});
				var devicesRoomNew = {
					id : newDeviceID,
					state : 0,
					temperature : 25,
					scale : "C",
					lastChange : "",
					programability : ProgramabilityNew
				}
				var devicesRoom = {
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					lastChange : String,
					programability : ProgramabilityNew
				}
				var room = {
					place : String,
					placeState : Number,
					devices : devices 
				}
				var allRooms = {
					userID : String,
					rooms : room
				}
		
				if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});
		
				rooms.findById(userId2, (err, data) => {
		
					if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
		
					if(!data) return res.status(404).send({message: 'El usuario no existe.'});
		
					if(res.status(200)){
						var one = JSON.stringify(data);
						var on1 = JSON.parse(one, devicesRoom);
						var on1leng = on1.rooms[indexRoom].devices.length;
						//console.log(on1leng);
						
						on1.rooms[indexRoom].devices[on1leng] = devicesRoomNew;
						//on1.rooms[indexRoom].devices[on1leng].id = newDeviceID;
						
						rooms.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
							if(err) return res.status(500).send({message: 'Error al actualizad estado'});
				
							if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
							if(res.status(200)){
								console.log("ROOMS AGREGADO");
							}
							
						});
					}
				
				});
			}
		
		});
	},
	deleteProfileFromUser: function(req, res){
		var userId2 = req.params.id;
		var on1;
		var indexToDelete = Number(req.params.indexUser);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});
		user.findById(userId2, (err, userr) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
			if(!userr) return res.status(404).send({message: 'El usuario no existe.'});
			if(res.status(200)){
				var newUserObj = {
					username : String,
					rol : Number,
					estado : Number,
					online : String
				}
				var one = JSON.stringify(userr);
				on1 = JSON.parse(one, newUserObj);

				var deletedUser = [];
				for(let i = 0; i < on1.Username.length; i++){
					
					if(i != indexToDelete){
						//console.log(on1[i]);
						deletedUser.push(on1.Username[i]);
					}else{
						
					}
				}
				on1.Username = deletedUser;
				user.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					if(res.status(200)){
						return res.status(200).send(deviceUpdate);
					}
					
				});

			}
			

		});
		
		
	},
	getDevicesFromRoom: function(req, res){

		var userId2 = req.params.id;
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		rooms.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){

				return res.status(200).send(data);
			}
		
		});
	},
	setDevicesToRoom: function(req, res){
		var userId2 = req.params.id;
		var newDeviceID = req.params.iddevice;
		var indexRoom = req.params.indexroom;
		var ProgramabilityNew = {
			onat: "00:00 am",
			offat: "00:00 am",
			online : 0
		}
		var newDevice = {
			id : newDeviceID,
			state : 0,
			temperature : 25,
			scale : "C",
			programability : ProgramabilityNew
		}
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var devicesRoom = {
			id : newDeviceID,
			state : 0,
			temperature : 25,
			scale : "C",
			lastChange : "",
			programability : ProgramabilityNew
		}
		var room = {
			place : String,
			placeState : Number,
			devices : devices 
		}
		var allRooms = {
			userID : String,
    		rooms : room
		}

		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		rooms.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				var one = JSON.stringify(data);
				var on1 = JSON.parse(one, devicesRoom);
				var on1leng = on1.rooms[indexRoom].devices.length;
				console.log(on1leng);
				on1.rooms[indexRoom].devices[on1leng] = devicesRoom;
				//console.log(on1.rooms[0]);
				//return res.status(200).send(on1.rooms[indexRoom].devices[on1leng]);
				rooms.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					if(req.status(200)){
						console.log("ROOMS AGREGADO");
					}
					
				});
			}
		
		});
	},
	getDevicesFromRoomPlace: function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var devices = [{
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			lastChange : String,
			programability : Programability
		}]
		var room = {
			place : String,
			placeState : Number,
			devices : device 
		}
		var allRooms = {
			userID : String,
    		rooms : room
		}
		var userId2 = req.params.id;
		var roomIndex = req.params.room;
		var device = req.params.device;
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		rooms.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				var one = JSON.stringify(data);
				var on1 = JSON.parse(one, devices);
				//console.log(on1.rooms[0]);
				return res.status(200).send(on1.rooms[roomIndex]);
			}
		
		});
	},
	getDevicesFromRoomPlaceAll: function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var devices = [{
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			lastChange : String,
			programability : Programability
		}]
		var room = {
			place : String,
			placeState : Number,
			devices : device 
		}
		var allRooms = {
			userID : String,
    		rooms : room
		}
		var userId2 = req.params.id;
		var roomIndex = req.params.room;
		var device = req.params.device;
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		rooms.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				var one = JSON.stringify(data);
				var on1 = JSON.parse(one, devices);
				//console.log(on1.rooms[roomIndex].devices[device]);
				return res.status(200).send(on1.rooms[roomIndex].devices[device]);
			}
		
		});
	},
	getAllDevicesFromRoomPlace: function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var devices = [{
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			lastChange : String,
			programability : Programability
		}]
		var room = {
			place : String,
			placeState : Number,
			devices : device 
		}
		var allRooms = {
			userID : String,
    		rooms : room
		}
		var userId2 = req.params.id;
		var roomIndex = req.params.room;
		var device = req.params.device;
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		rooms.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				var one = JSON.stringify(data.rooms.devices);
				var on1 = JSON.parse(one, devices);
				//console.log(on1.rooms[roomIndex].devices[device]);
				//console.log(on1);
				return res.status(200).send(on1[roomIndex]);
			}
		
		});
	},
	getProgramabilityOnDevicesFromUser: function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var oneDevice = {
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			Programability : Programability
		}

		var userId2 = req.params.id;
		var device = req.params.device;

		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});
			
			if(res.status(200)){

				var one = JSON.stringify(data);
				var on1 = JSON.parse(one, oneDevice);
				//console.log(on1.devices[device].Programability);
				//return res.status(200).send(data.devices);
				return res.status(200).send(on1.devices[device].Programability);
			}
		
		});
	},
	updateStatesFromDevice : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var oneDevice = {
			id : String,
			state : Number,
			temperature : Number,
			scale : String,
			Programability : Programability
		}
		
		var userId2 = req.params.id;
		var device = req.params.device;
		var state  = parseInt(req.params.state);
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var one = JSON.stringify(data);
				//console.log(one);
				
				var manyDevices = [{
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					Programability : Programability
				}]
				var on1 = JSON.parse(one, manyDevices);
				//console.log(on1.devices);
				//console.log("-----------------");
				on1.devices[device] = {
					id : on1.devices[device].id,
					state : state,
					temperature : on1.devices[device].temperature,
					scale : on1.devices[device].scale,
					Programability : on1.devices[device].Programability
				}
				//console.log(on1);
				devices.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						device : deviceUpdate
					});
				});

			}
		
		});
		
	},
	updateTemperatureFromDevice : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var userId2 = req.params.id;
		var device = req.params.device;
		var temp  = parseInt(req.params.temperature);
		//console.log(temp);
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var one = JSON.stringify(data);
				//console.log(one);
				
				var manyDevices = [{
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					Programability : Programability
				}]
				var on1 = JSON.parse(one, manyDevices);
				//console.log(on1.devices);
				//console.log("-----------------");
				on1.devices[device] = {
					id : on1.devices[device].id,
					state : on1.devices[device].state,
					temperature : temp,
					scale : on1.devices[device].scale,
					Programability : on1.devices[device].Programability
				}
				//console.log(on1);
				devices.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						device : deviceUpdate
					});
				});
			}
		});
	},
	updateTemperatureFromDeviceInRoom : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var userId2 = req.params.id;
		var roomindice = req.params.room;
		var device = req.params.device;
		//var temp  = parseInt(req.params.temperature);
		var objDevice = req.body;
		//console.log(temp);
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		rooms.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var one = JSON.stringify(data);
				//console.log(one);
				
				var manyDevices = {
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					lastChange : String,
					Programability : Programability
				}
				var roomb = {
					place: String,
					placeState : Number,
					devices : manyDevices,

				}
				var roomo = {
					userId: String,
					rooms : roomb,
					user : String
				}

				var on1 = JSON.parse(one, roomo);
				//console.log(on1.devices);
				//console.log("-----------------");
				on1.rooms[roomindice].devices[device] = {
					id : on1.rooms[roomindice].devices[device].id,
					state : Number(objDevice.state),
					temperature : Number(objDevice.temperature),
					scale : on1.rooms[roomindice].devices[device].scale,
					lastChange : objDevice.lastChange,
					Programability : on1.rooms[roomindice].devices[device].Programability
				}
				console.log(on1.rooms[roomindice].devices[device]);
				rooms.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						device : deviceUpdate
					});
				});
			}
		});
	},
	updateTemperatureFromDevicePlus : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var userId2 = req.params.id;
		var device = req.params.device;
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var one = JSON.stringify(data);
				//console.log(one);
				
				var manyDevices = [{
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					Programability : Programability
				}]
				var on1 = JSON.parse(one, manyDevices);
				//console.log(on1.devices);
				//console.log("-----------------");
				var plusTemp = parseInt(on1.devices[device].temperature);
				//console.log(plusTemp); 
				plusTemp = plusTemp + 1;
				//console.log(plusTemp); 
				on1.devices[device] = {
					id : on1.devices[device].id,
					state : on1.devices[device].state,
					temperature : plusTemp,
					scale : on1.devices[device].scale,
					Programability : on1.devices[device].Programability
				}
				//console.log(on1);
				devices.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						device : deviceUpdate
					});
				});
			}
		});
	},
	updateTemperatureFromDeviceMin : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		}
		var userId2 = req.params.id;
		var device = req.params.device;
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var one = JSON.stringify(data);
				//console.log(one);
				
				var manyDevices = [{
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					Programability : Programability
				}]
				var on1 = JSON.parse(one, manyDevices);
				//console.log(on1.devices);
				
				var plusTemp = parseInt(on1.devices[device].temperature);
				//console.log(plusTemp); 
				plusTemp = plusTemp - 1;
				//console.log(plusTemp); 
				on1.devices[device] = {
					id : on1.devices[device].id,
					state : on1.devices[device].state,
					temperature : plusTemp,
					scale : on1.devices[device].scale,
					Programability : on1.devices[device].Programability
				}
				//console.log(on1);
				devices.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						device : deviceUpdate
					});
				});
			}
		});
	},
	updateProgramabilityFromDevice : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		};

		var userId2 = req.params.id;
		var device = req.params.device;
		var prom = req.body;
		//console.log(prom);
		var promn = JSON.stringify(prom);
		//console.log(promn);
		var NuevaProgramability = {
			onat: String,
			offat: String,
			online : String
		}

		var pon1 = JSON.parse(promn, NuevaProgramability);
		
		//var temp  = parseInt(req.params.temperature);
		//console.log(pon1);
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		devices.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var one = JSON.stringify(data);
				//console.log(one);
				
				var manyDevices = [{
					id : String,
					state : Number,
					temperature : Number,
					scale : String,
					Programability : Programability
				}]
				
				var on1 = JSON.parse(one, manyDevices);
				//console.log(on1.devices);
				//console.log("-----------------");
				on1.devices[device] = {
					id : on1.devices[device].id,
					state : on1.devices[device].state,
					temperature : on1.devices[device].temperature,
					scale : on1.devices[device].scale,
					Programability : pon1
					
				}
				//console.log("-----------");
				//console.log(on1.devices);
				devices.findByIdAndUpdate(userId2, on1, (err, deviceUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!deviceUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						device : deviceUpdate
					});
				});
			}
		});
	},
	dropUser : function (req, res){
		var userId2 = req.params.id;
		var indexUser = req.params.index;
		var newUserObj = {
			username : String,
			rol : Number,
			estado : Number,
			online : String
		}

		

		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		user.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var mongoUser = JSON.stringify(data);
				
				var allUsers = {
					Username: user,
					Password: String,
					Email : String
				}
				

				 var theNewUser = {
					username : newUser.username,
					rol : parseInt(newUser.rol),
					estado : parseInt(newUser.estado),
					online : parseInt(newUser.online)
				}
				var allUsersFromMONGO = JSON.parse(mongoUser, allUsers);
				var theUser = JSON.parse(newUserJson, newUserObj);
				var lengthFromUser = Object.keys(allUsersFromMONGO.Username).length;
				allUsersFromMONGO.Username[lengthFromUser] =  theNewUser;
				console.log(lengthFromUser);
				console.log(theNewUser);
				console.log(theUser);
				console.log(allUsersFromMONGO);

				/*user.findByIdAndUpdate(userId2, allUsersFromMONGO, (err, userUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						user : userUpdate
					});
				});*/
			}
		});
	},
	newUserToID : function(req, res){
		var Programability = {
			onat: String,
			offat: String,
			online : String
		};
		var userId2 = req.params.id;
		var newUser = req.body;
		var newUserJson = JSON.stringify(newUser);
		var newUserObj = {
			username : String,
			rol : Number,
			estado : Number,
			online : String
		}

		var theUser = JSON.parse(newUserJson, newUserObj);

		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		user.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){
				

				var mongoUser = JSON.stringify(data);
				
				var allUsers = {
					Username: user,
					Password: String,
					Email : String
				}
				

				 var theNewUser = {
					username : newUser.username,
					rol : parseInt(newUser.rol),
					estado : parseInt(newUser.estado),
					online : parseInt(newUser.online)
				}
				var allUsersFromMONGO = JSON.parse(mongoUser, allUsers);

				var lengthFromUser = Object.keys(allUsersFromMONGO.Username).length;
				allUsersFromMONGO.Username[lengthFromUser] =  theNewUser;
				//console.log(lengthFromUser);
				//console.log(theNewUser);
				//console.log(allUsersFromMONGO);

				user.findByIdAndUpdate(userId2, allUsersFromMONGO, (err, userUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						user : userUpdate
					});
				});
			}
		});
	},
	setOnlineToUser : function(req, res){
		var userId2 = req.params.id;
		var newState = req.params.state;
		var index = req.params.index;
		

		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		user.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){

				var mongoUser = JSON.stringify(data);
				
				var allUsers = {
					Username: user,
					Password: String,
					Email : String
				}
				
				var allUsersFromMONGO = JSON.parse(mongoUser, allUsers);
				

				allUsersFromMONGO.Username[index] = {
					username : allUsersFromMONGO.Username[index].username,
					rol : allUsersFromMONGO.Username[index].rol,
					estado :allUsersFromMONGO.Username[index].estado,
					online : parseInt(newState)
				}
				

				
				
				//console.log(allUsersFromMONGO);

				user.findByIdAndUpdate(userId2, allUsersFromMONGO, (err, userUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						user : userUpdate
					});
				});
			}
		});
	},
	setUpdateToUser : function(req, res){
		var userId2 = req.params.id;
		var index = req.params.index;
		var nombre = req.body.username;
		var rol = Number(req.body.rol);
		var estado = Number(req.body.estado);
		
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		user.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			if(res.status(200)){

				var mongoUser = JSON.stringify(data);
				
				var allUsers = {
					Username: user,
					Password: String,
					Email : String
				}
				
				var allUsersFromMONGO = JSON.parse(mongoUser, allUsers);
				allUsersFromMONGO.Username[index] = {
					username : nombre,
					rol : rol,
					estado : estado,
					online : allUsersFromMONGO.Username[index].online
				}
				
				//console.log(allUsersFromMONGO);

				user.findByIdAndUpdate(userId2, allUsersFromMONGO, (err, userUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
					
					return res.status(200).send({
						user : userUpdate
					});
				});
			}
		});
	},
	getAllAnalytics: function(req, res){
		var userId2 = req.params.id;
		//var device = req.params.device;
		var deviceId = req.params.iddevice;
		//var month = req.params.month;
		//var ofmonth = month-1;
		//var day = req.params.day;
		//var ofday = day-1;
		//console.log(device);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		analytics.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			
			if(res.status(200)){
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
				
				var Analisis = {
					idUser: String,
					devicess : devices,
					
				};
				var mongoAnalisis = JSON.stringify(data);
				//console.log(mongoAnalisis);
				var obAnalisis = JSON.parse(mongoAnalisis,Analisis);
				var lent = obAnalisis.devicess.length;
				
				console.log(lent);
				obAnalisis.devicess[lent] = obAnalisis.devicess[0];
				obAnalisis.devicess[lent].idDevice = deviceId;
				console.log(obAnalisis.devicess[lent]);
				return res.status(200).send(obAnalisis.devicess[lent]);
			}

		});
	},
	getAnalyticsFromTemperature: function(req, res){
		var userId2 = req.params.id;
		var device = req.params.device;
		var month = req.params.month;
		var ofmonth = month-1;
		var day = req.params.day;
		var ofday = day-1;
		//console.log(device);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		analytics.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			
			if(res.status(200)){
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
				
				var Analisis = {
					idUser: String,
					devicess : devices,
					
				};
				var mongoAnalisis = JSON.stringify(data);
				//console.log(mongoAnalisis);
				var obAnalisis = JSON.parse(mongoAnalisis,Analisis);
				//console.log(obAnalisis.devices[0].changeLog.years.months[0].days[0].changes[0].stateChange);
				//console.log(data.devices.changeLog.years);
				//console.log(obAnalisis.devicess[device].changeLog.years.months[ofmonth].days[ofday].changes[0].temperatureChange);
				return res.status(200).send(obAnalisis.devicess[device].changeLog.years.months[ofmonth].days[ofday].changes[0].temperatureChange);
			}

		});
	},
	getAnalyticsFromState: function(req, res){
		var userId2 = req.params.id;
		var device = req.params.device;
		var month = req.params.month;
		var ofmonth = month-1;
		var day = req.params.day;
		var ofday = day-1;
		//console.log(userId2);
		if(userId2 == null) return res.status(404).send({message: 'El user no existe.'});

		analytics.findById(userId2, (err, data) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!data) return res.status(404).send({message: 'El usuario no existe.'});

			
			if(res.status(200)){
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
				
				
				var devices = {
					idDevice : String,
					changeLog : changeLog
				}
				
				var Analisis = {
					idUser: String,
					devices : devices,
					
				};
				var mongoAnalisis = JSON.stringify(data);
				//console.log(mongoAnalisis);
				var obAnalisis = JSON.parse(mongoAnalisis,Analisis);
				//console.log(obAnalisis.devices[0].changeLog.years.months[0].days[0].changes[0].stateChange);
				//console.log(data.devices.changeLog.years);
				return res.status(200).send(obAnalisis.devicess[device].changeLog.years.months[ofmonth].days[ofday].changes[0].stateChange);
			}

		});
	},
	setNewTemperatureChange: function(req, res){
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
		
		
		var devices = {
			idDevice : String,
			changeLog : changeLog
		}
		
		var Analisis = {
			idUser: String,
			devicess : devices,
			
		}
			var userId2 = req.params.id;
			var devicenumber = req.params.device;
			var month = req.params.month;
			var ofMonth = Number(month-1) ;
			var day = req.params.day;
			var ofday = Number(day-1);
			//console.log(ofMonth + "/" + ofday);
			let now= new Date();
			let timeChanged = now.toLocaleString();
			var newChange = req.body;
			var newTempChange = JSON.stringify(newChange);
			
			var theChange = JSON.parse(newTempChange, temperatureChange);
			
			theChange.time = timeChanged;

			analytics.findById(userId2, (err, data) => {
	
				if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
	
				if(!data) return res.status(404).send({message: 'El usuario no existe.'});
	
				
				if(res.status(200)){
					
					var mongoAnalisis = JSON.stringify(data);
					
					var theNewtemperatureChange = {
						time : timeChanged,
						by : theChange.by,
						temperature : parseInt(theChange.temperature),
						rol : parseInt(theChange.rol)
					}
								
				var allChangesFromMONGO = JSON.parse(mongoAnalisis, newAnalisis);
				
				var newAnalisis = {
					idUser: allChangesFromMONGO.idUser,
					devicess : allChangesFromMONGO.devicess,
					
				}
				//console.log("----------------");
				var lengthFromUser = newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].temperatureChange.length;
				//console.log(lengthFromUser);
				newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].temperatureChange[lengthFromUser] = theNewtemperatureChange;
				analytics.findByIdAndUpdate(userId2, newAnalisis, (err, userUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
					//console.log(newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].temperatureChange);
					return res.status(200).send({
						Analisis : userUpdate
					});
				});
				
				}
				
			});
			
	},
	// 
	setNewEstateChange: function(req, res){
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
		
		
		var devices = {
			idDevice : String,
			changeLog : changeLog
		}
		
		var Analisis = {
			idUser: String,
			devicess : devices,
			
		}
			var userId2 = req.params.id;
			var devicenumber = req.params.device;
			var month = req.params.month;
			var ofMonth = Number(month-1) ;
			var day = req.params.day;
			var ofday = Number(day-1);
			//console.log(ofMonth + "/" + ofday);
			let now= new Date();
			let timeChanged = now.toLocaleString();
			var newChange = req.body;
			var newStateChange = JSON.stringify(newChange);
			
			var theChange = JSON.parse(newStateChange, stateChange);
			
			theChange.time = timeChanged;

			analytics.findById(userId2, (err, data) => {
	
				if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
	
				if(!data) return res.status(404).send({message: 'El usuario no existe.'});
	
				
				if(res.status(200)){
					
					var mongoAnalisis = JSON.stringify(data);
					
					var theNewStateChange = {
						time : timeChanged,
						by : theChange.by,
						state : parseInt(theChange.state),
						rol : parseInt(theChange.rol)
					}
								
				var allChangesFromMONGO = JSON.parse(mongoAnalisis, newAnalisis);
				
				var newAnalisis = {
					idUser: allChangesFromMONGO.idUser,
					devicess : allChangesFromMONGO.devicess,
					
				}
				//console.log("----------------");
				var lengthFromUser = newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].stateChange.length;
				//console.log(lengthFromUser);
				newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].stateChange[lengthFromUser] = theNewStateChange;
				analytics.findByIdAndUpdate(userId2, newAnalisis, (err, userUpdate)=>{
					if(err) return res.status(500).send({message: 'Error al actualizad estado'});
		
					if(!userUpdate) return res.status(404).send({message: 'No existe estado'});
					//console.log(newAnalisis.devicess[devicenumber].changeLog.years.months[ofMonth].days[ofday].changes[0].stateChange);
					return res.status(200).send({
						Analisis : userUpdate
					});
				});
				
				}
				
			});
			
	}

};
module.exports = controller;




