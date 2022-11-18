'use strict'

var express = require('express');
var ProjectController = require('../controllers/aire');

var router = express.Router();

var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-aire', ProjectController.saveAire);
router.get('/aire/:id?', ProjectController.getAire);
router.get('/aire-exist/:id?', ProjectController.getAireExist);
router.put('/aire-user/:id?/:idDevice?', ProjectController.putUserAire);
router.put('/new-device/:id?/:idDevice?/:indexroom?', ProjectController.putNewDeviceToUser)
router.get('/Aires', ProjectController.getAires);
router.post('/envio', ProjectController.sendCorreo);
router.post('/save-user', ProjectController.saveUser);
router.get('/get-user/:id?', ProjectController.getUser);
router.get('/get-devices/:id?', ProjectController.getDevices);
router.get('/get-devices-room/:id?/', ProjectController.getDevicesFromRoom);
router.get('/get-devices-from-user/:id?/:device?', ProjectController.getDevicesFromUser);
router.get('/get-devices-from-place/:id?/:room?', ProjectController.getDevicesFromRoomPlace);
router.put('/update-device-from-room/:id?/:room?/:device?', ProjectController.updateTemperatureFromDeviceInRoom);
router.get('/get-devices-from-place-all/:id?/:room?/:device?', ProjectController.getDevicesFromRoomPlaceAll);
router.get('/get-devices-all-devices-from-place/:id?/:room?', ProjectController.getAllDevicesFromRoomPlace);
router.get('/get-programability-devices-from-user/:id?/:device?', ProjectController.getProgramabilityOnDevicesFromUser);
router.put('/update-devices/:id', ProjectController.updateStates);
router.put('/turn-on-off-device/:id?/:device?/:state?', ProjectController.updateStatesFromDevice);
router.put('/change-temperature-device/:id?/:device?/:temperature?', ProjectController.updateTemperatureFromDevice);
router.put('/change-temperature-device-plus/:id?/:device?', ProjectController.updateTemperatureFromDevicePlus);
router.put('/change-temperature-device-min/:id?/:device?', ProjectController.updateTemperatureFromDeviceMin);
router.put('/change-programability-from-device/:id?/:device?/:programability?', ProjectController.updateProgramabilityFromDevice);
router.put('/add-user/:id?', ProjectController.newUserToID);
router.put('/online-user/:id?/:state?/:index?', ProjectController.setOnlineToUser);
router.get('/get-analytics-temperature/:id?/:device?/:month?/:day?', ProjectController.getAnalyticsFromTemperature);
router.get('/get-analytics-state/:id?/:device?/:month?/:day?', ProjectController.getAnalyticsFromState);
router.put('/set-new-temperature-change/:id?/:device?/:month?/:day?', ProjectController.setNewTemperatureChange);
router.put('/set-new-state-change/:id?/:device?/:month?/:day?', ProjectController.setNewEstateChange);
router.put('/update-user/:id?/:index?', ProjectController.setUpdateToUser);
router.get('/get-all-analytics/:id?/:iddevice?', ProjectController.getAllAnalytics);
router.get('/borrar/:id?/:iddevice?/:indexroom?', ProjectController.setDevicesToRoom);
/*router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);*/

module.exports = router;