import { Component, OnInit } from '@angular/core';
import { Aires } from 'src/app/models/aires';
import { AireService } from 'src/app/services/aire.service';
import { global } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Correo } from 'src/app/models/correo';
import { Devices } from 'src/app/models/devices';
import { Device } from 'src/app/models/device';
import { Programability } from 'src/app/models/programability';
import { temperatureChange } from 'src/app/models/temperatureChange';
import { stateChange } from 'src/app/models/stateChange';
import { state } from '@angular/animations';
import { Rooms } from 'src/app/models/rooms';
import { RoomDevices } from 'src/app/models/roomDevices'
@Component({
  selector: 'app-veraire',
  templateUrl: './veraire.component.html',
  styleUrls: ['./veraire.component.css'],
  providers: [AireService]
})
export class VeraireComponent implements OnInit {
  public dev: Device[];
  public _room : Rooms[];
  public _roomDev : RoomDevices[];
  public _roomObject : Rooms;
  public d : Device;
  public deviches : Devices;
  public arrayDev : Device[]
  public idUser : String | null;
  public program : Programability;
  public updateProgram : Programability;
  public username : String | null;
  public configWasSelected : Number;
  public dat= new Date();
    
  public today : Number = this.dat.getDate();
  public month : Number = this.dat.getMonth()+1;
  public actualIndex : Number;
  public onattime : String;
  public offattime : String;
  public online : String;
  public newTempChange : temperatureChange;
  public newStatChange : stateChange;

  public tempProm : [Number];
  constructor(
    private _aireservice: AireService,
    private _userService : UserService

  ) { 
    this.tempProm = [0];
    this.actualIndex = 0;
    this.onattime = "";
    this.offattime = "";
    this.online = "Online";
    this.configWasSelected = 5;
    this.idUser = "";
    this.username = "";
    this.program = new Programability("","", "");
    this.updateProgram = new Programability("","", "");
    this.newTempChange = new temperatureChange("","",0,0);
    this.newStatChange = new stateChange("","",0,0);
    this.d = new Device("",0,0,"", this.program);
    this.deviches  = new Devices(this.d);
    this.arrayDev = [];
    this.dev = [];
    this._room = [];
    this._roomDev = [];
    this._roomObject = new Rooms("",9, this.deviches);
  }

  ngOnInit(): void {
  //this.getAires();
  this.idUser = sessionStorage.getItem('idUser');
    this.username = sessionStorage.getItem('user');
  this.getRooms(this.idUser as String);
  
  }

  // getAires(){
  //   this._aireservice.getAires().subscribe(
  //     response =>{
  //       console.log(response);
  //     },
  //     error =>{
  //       console.log(<any>error);
  //     }
  //   );
  // }
  getRooms(id : String){
    this._userService.getAllRooms(id).subscribe(
      response =>{
        if(response){
          this._room = response.rooms;
          
          
           for (var index in response.rooms){
         
                  this._userService.getAllDevicesFromRoom(id, Number(index)).subscribe(
                    response =>{
                      //console.log(response);  
                      this._roomDev = response;
                     
                      for(let i = 0; i < this._room.length; i++){
                        var prom = 0;
                        var finalProm = 0;
                        for(let j = 0; j < this._roomDev.length; j++){
                          prom = prom + Number(this._roomDev[j].temperature);
                          
                        }
                        finalProm = prom / this._roomDev.length;
                        this.tempProm[i] = finalProm;
                      }
                    },
                    error =>{
                      console.log(<any>error);
                    }
                  )
                  //HAY QUE HACER NUEVO MODELO PARA EL ROOM


           }
           this.getPromTemp();
         // this._roomDev = response.rooms.devices;
          //console.log(this._roomObject);
          

        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  getPromTemp(){
    
    var prom = 0.0;
    var finalProm = 0.0;
    // for (var index in this._room){
    //     //console.log(prom);
    //     finalProm = prom / this._roomDev.length;
    //     this.tempProm[index] = finalProm
    //     //console.log(finalProm);
    // }
    
  }
}
