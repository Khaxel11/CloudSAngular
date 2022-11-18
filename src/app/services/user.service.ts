import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";
import { Devices } from "../models/devices";
import { Programability } from "../models/programability";
import { Username } from "../models/username";
import { temperatureChange } from "../models/temperatureChange";
import { stateChange } from "../models/stateChange";
import { RoomDevices } from "../models/roomDevices";

@Injectable()
export class UserService{
    public url:string;
    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }
    saveUser(us: User): Observable<any>{
        let params = JSON.stringify(us);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-user',params,{headers:headers});
    }
    getUser(id : String) : Observable <any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-user/"+id,{headers:headers});
    }
    getDevices(id : String) : Observable <any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-devices/"+id,{headers:headers});
    }
    getAllRooms(id : String) : Observable <any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-devices-room/"+id,{headers:headers});
    }
    getOneRoom(id : String, room : Number) : Observable <any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-devices-from-place/"+id+"/"+room,{headers:headers});
    }
    getDeviceFromRoom(id : String, room : Number, device : Number) : Observable <any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-devices-from-place-all/"+id + "/"+device,{headers:headers});
    }
    getAllDevicesFromRoom(id : String, room : Number) : Observable <any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-devices-all-devices-from-place/"+id+"/"+room,{headers:headers});
    }
    updateDeviceInRoom(id : String, room : Number, device : Number,roomDev: RoomDevices) : Observable <any>{
        let params = JSON.stringify(roomDev)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"update-device-from-room/"+id+"/"+room+"/"+device,params,{headers:headers});
    }
    getProgramabilityFromUser(id : String | null, dev : Number) : Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"get-programability-devices-from-user/"+id+"/"+dev,{headers:headers});
    }

    updateState(state: Devices) : Observable <any>{
        //let params = JSON.stringify(state)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"Aires/",{headers:headers});
    }
    turnDevice(id: String | null, device: Number, state: Number): Observable <any>{
        //let params = JSON.stringify(state)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log(this.url+"turn-on-off-device/"+id+"/"+device+"/"+state);
        return this._http.put(this.url+"turn-on-off-device/"+id+"/"+device+"/"+state,{headers:headers});
    }
    changeTemperature(id: String, device: Number, temperature: Number): Observable <any>{
        //let params = JSON.stringify(state)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"change-temperature-device/"+id+"/"+device+"/"+temperature,{headers:headers});
    }
    plusTemperature(id: String | null, device: Number): Observable <any>{
        //let params = JSON.stringify(state)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"change-temperature-device-plus/"+id+"/"+device,{headers:headers});
    }
    minTemperature(id: String | null, device: Number): Observable <any>{
        //let params = JSON.stringify(state)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"change-temperature-device-min/"+id+"/"+device,{headers:headers});
    }
    updateProgramabilityFromDevice(id: String | null, device: Number, prog : Programability): Observable <any>{
        let params = JSON.stringify(prog)
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"change-programability-from-device/"+id+"/"+device,params,{headers:headers});
    }
    addUser (id : String | null, us : Username) : Observable <any>{
        let params = JSON.stringify(us);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'add-user/' + id, params,{headers:headers});
    }
    updateUser(id : String | null, us : Username, index : Number){
        let params = JSON.stringify(us);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'update-user/' + id + "/"+index, params,{headers:headers});
    }
    getAnalyticsTemperature(id : String | null, device : Number, month : Number, day : Number) : Observable <any>{
        //let params = JSON.stringify(us);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'get-analytics-temperature/' + id + "/"+ device +"/"+month+"/"+day ,{headers:headers});
    }
    getAnalyticsStates(id : String | null, device : Number, month : Number, day : Number) : Observable <any>{
        //let params = JSON.stringify(us);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'get-analytics-state/' + id + "/"+ device +"/"+month+"/"+day ,{headers:headers});
    }
    setNewTemperatureChange(id: String | null, device: Number, month : Number, day : Number, temperatureChange : temperatureChange): Observable <any>{
        let params = JSON.stringify(temperatureChange)
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.put(this.url+"set-new-temperature-change/"+id+"/"+device+"/"+month+"/"+day,params,{headers:headers});   
    }
    setNewStateChange(id: String | null, device: Number, month : Number, day : Number, stateChange : stateChange): Observable <any>{
        let params = JSON.stringify(stateChange)
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.put(this.url+"set-new-state-change/"+id+"/"+device+"/"+month+"/"+day,params,{headers:headers});   
    }
    setNewStateToUser(id: String, state: Number, index : Number) : Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'online-user/'+ id + '/' +state + '/' +index,{headers:headers});
    }

    

    getAires(id : String) : Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"aire/"+id,{headers:headers});
    }

    dropProfile(id : String, index : Number) : Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"delete-profile/"+id+"/"+index,{headers:headers});
    }


    addNewDevice (id : String, idDev : String, room : Number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"new-device/"+id+"/"+idDev+"/"+room,{headers:headers});
    }
    
    addIDtoAir (id : String, idDev : String){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+"aire-user/"+"/"+idDev, {headers:headers})
    }
}