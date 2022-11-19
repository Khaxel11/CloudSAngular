import { Component, OnInit, ViewChild } from '@angular/core';
import { AireService } from 'src/app/services/aire.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Correo } from 'src/app/models/correo';
import { Devices } from 'src/app/models/devices';
import { Device } from 'src/app/models/device';
import { Programability } from 'src/app/models/programability';
import { temperatureChange } from 'src/app/models/temperatureChange';
import { stateChange } from 'src/app/models/stateChange';
import { state } from '@angular/animations';
import { RoomDevices } from 'src/app/models/roomDevices';
import swal from'sweetalert2';
import { AireDevice } from 'src/app/models/airedevice';
import { Rooms } from 'src/app/models/rooms';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [UserService]
})
export class DevicesComponent implements OnInit {
  @ViewChild('gridGuia') public gridGuia: any;
  public newIdDevice : String = "";
  public roomDevice: RoomDevices;
  public dev: Device[];
  public d : Device;
  public arrayDev : Device[]
  public idUser : String | null;
  public program : Programability;
  public updateProgram : Programability;
  public username : String | null;
  public configWasSelected : Number;
  public dat= new Date();
  public mail: Correo;
  public actualRol : Number = 9;
  public actualMail : String | null;
  public today : Number = this.dat.getDate();
  public month : Number = this.dat.getMonth()+1;
  public actualIndex : Number;
  public onattime : String;
  public offattime : String;
  public online : String;
  public newTempChange : temperatureChange;
  public _aire = new AireDevice("1a","1a","1a");
  public newStatChange : stateChange;
  public _roomDev : Rooms[];
  public clickAddDevice = 9;
  public clickNewDevice = 9;
  public clickSelectDevice = 9;
  public selectRoomIndex = 0;
  public dataRoom = [""];
  public newDevice = {
    userID : String,
    deviceID : String,
    room : Number
  }
  //public clickAvailable = 9;

  constructor(
    private _userService : UserService,
    private _aireService : AireService
  ) { 
    //this.dev = [];
    
    this.actualIndex = 0;
    this.actualMail = "";
    this.onattime = "";
    this.offattime = "";
    this.online = "Online";
    this.configWasSelected = 5;
    this.idUser = "";
    this.username = "";
    this.mail = new Correo('','','','');

    this.program = new Programability("","", "");
    this.updateProgram = new Programability("","", "");
    this.newTempChange = new temperatureChange("","",0,0);
    this.newStatChange = new stateChange("","",0,0);
    this.d = new Device("",0,0,"", this.program);
    this.arrayDev = [];
    this.dev = [];
    this._roomDev = [];
    this.roomDevice = new RoomDevices("",9,99,"","",this.program);
    
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem('idUser');
    this.actualRol = Number(sessionStorage.getItem('estado'));
    this.actualMail = sessionStorage.getItem('correo');
    this.username = sessionStorage.getItem('user');
    //console.log(this.idUser? this.idUser : "");
    this.getDevices(this.idUser? this.idUser : "");
    this.getRooms(this.idUser as String);

  }
  
  getAires(id : String){
    this._userService.getAires(id).subscribe(
      response =>{
        
        
        if(response.aire.userID == "DISPONIBLE"){
          this.clickAddDevice = 1;
          this._aire = response.aire;
        }else{
          this.clickAddDevice = 9;
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Este dispositivo esta siendo ocupado por otro usuario'//,
            //footer: '<a href="">Why do I have this issue?</a>'
          })  
        }
        console.log(this._aire);
      },
      error =>{
        //console.log(<any>error);
        this.clickAddDevice = 9;
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe Aire'//,
          //footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }
  setDataDevice (){
    
    for(let i = 0; i < this._roomDev.length ; i++){
      this.dataRoom[i] = String(this._roomDev[i].place);
      console.log(this.dataRoom[i]);
    }
    this.clickSelectDevice = 1;

  }
  clickNewDev (){
    if(this.clickNewDevice == 9){
      this.clickNewDevice = 1;
    }
    else{
      this.clickNewDevice = 9;
    }
  }
  saveDevice (room : Number){
    swal.fire({
      title: '¿Desea guardar dispositivo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      //denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //console.log(room);
        this._userService.addNewDevice(this.idUser as String, this.newIdDevice, room).subscribe(
          response =>{
            if(response){
              this.clickNewDevice = 9;
              this.clickAddDevice = 9;
              this.clickSelectDevice = 9;
              
              swal.fire('Guardado!', '', 'success');
              this.getDevices(this.idUser as String);
              this.ngOnInit();

              // this._userService.addIDtoAir(this.idUser as String, this.newIdDevice).subscribe(
              //   response => {
                  
              //   }, error =>{

              //   }
              // )
            }
          },
          error => {
            console.log(<any>error);
          }
        )
        

      } else if (result.isDenied) {
        swal.fire('Cancelado', '', 'info')
      }
    })
  }
  getRooms(id : String){
    this._userService.getAllRooms(id).subscribe(
      response =>{
        if(response){
          this._roomDev = response.rooms;
          console.log(this._roomDev);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  getDevices(id : String){
    this._userService.getDevices(id).subscribe(
      response =>{
        if(response){
          this.dev = response;
          this.arrayDev = this.dev;
          for (var index in response){
            this.arrayDev[Number(index)] = response[Number(index)];
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  RoomDeviceUpdate(id : String, room : Number, device : Number, devRoom : RoomDevices){
    this._userService.updateDeviceInRoom(this.idUser as String, room,device, devRoom).subscribe(
      response =>{
        console.log("cambio Room");
        //console.log("cambio Room");
      },
      error =>{

      }
    )
  }
  turnDevice(dev : Number, state : Number){
    var estado = 9;
    this._userService.turnDevice(this.idUser, dev, state).subscribe(
      response =>{
        if(response){
          
          this.getDevices(this.idUser? this.idUser : "");
          
          //window.location.reload();
        }
      },error =>{
        console.log(<any>error);
      }
    )
    this.newStatChange.by = this.username as String;
    this.newStatChange.state = state;
    this.newTempChange.rol = 0;
    this._userService.setNewStateChange(this.idUser, dev, this.month, this.today, this.newStatChange).subscribe(
      response =>{
        if(response){
          console.log(response)
          console.log("Actualice");  
          //this.getDevices(this.idUser? this.idUser : "");
         
          this.dev[Number(dev)]
        }
      },error =>{
        console.log(<any>error);
        
      }
    )
    this.roomDevice = new RoomDevices("",this.dev[Number(dev)].state,this.dev[Number(dev)].temperature,"",this.username as String,this.program);
    console.log(this.roomDevice);
    this.RoomDeviceUpdate(this.idUser as String,0,dev,this.roomDevice);
  }
  plusTemperature(dev : Number){
    this.roomDevice = new RoomDevices("",this.dev[Number(dev)].state,this.dev[Number(dev)].temperature+1,"",this.username as String,this.program);
    console.log(this.roomDevice);
    this.RoomDeviceUpdate(this.idUser as String,0,dev,this.roomDevice);
    if(this.actualRol == 3){
      this.sendCorreo(this.actualMail as string, this.username as string, this.idUser as string, dev, this.dev[Number(dev)].temperature+1 );
      swal.fire(
        'Petición Enviada!',
        'Se ha enviado una solicitud de cambio al administrador, por favor espere la confirmación de cambio',
        'success'
      )
    }else{
      this._userService.plusTemperature(this.idUser, dev).subscribe(
        response =>{
          if(response){
            //console.log("MAS");  
            this.getDevices(this.idUser? this.idUser : "");
          }
        },error =>{
          console.log(<any>error);
        }
      )
      this.newTempChange.by = this.username as String;
      this.newTempChange.temperature = this.dev[Number(dev)].temperature+1;
      this.newTempChange.rol = 0;
      this._userService.setNewTemperatureChange(this.idUser, dev, this.month, this.today, this.newTempChange).subscribe(
        response =>{
          if(response){
            console.log(response)
            console.log("Actualice");  
            //this.getDevices(this.idUser? this.idUser : "");
          }
        },error =>{
          console.log(<any>error);
        }
      )
    }
    
    
    
  }
  minTemperature(devic: Number){
    this._userService.minTemperature(this.idUser, devic).subscribe(
      response =>{
        if(response){
          //console.log("MENOS");
          this.getDevices(this.idUser? this.idUser : "");
        }
      },error =>{
        console.log(<any>error);
      }
    )
    this.newTempChange.by = this.username as String;
    this.newTempChange.temperature = this.dev[Number(devic)].temperature-1;
    this.newTempChange.rol = 0;
    this._userService.setNewTemperatureChange(this.idUser, devic, this.month, this.today, this.newTempChange).subscribe(
      response =>{
        if(response){
          console.log(response)
          console.log("Actualice");  
          //this.getDevices(this.idUser? this.idUser : "");
        }
      },error =>{
        console.log(<any>error);
      }
    )
    this.roomDevice = new RoomDevices("",this.dev[Number(devic)].state,this.dev[Number(devic)].temperature-1,"",this.username as String,this.program);
    console.log(this.roomDevice);
    this.RoomDeviceUpdate(this.idUser as String,0,devic,this.roomDevice);
  }
  sendCorreo(correo : string, userName : string, id : String, dev : Number, temp : Number ){
    var corr = 
   
    "<div style='text-align: center;'> " +
    "<a href='https://imgbb.com/'><img src='https://i.ibb.co/sg5Yc8N/logo.png' alt='logo' border='0'></a>" +
    "<h1>SOLICITUD DE CAMBIO DE TEMPERATURA</h1> " +
    "<h2> El usuario "+ userName + " ha SOLICITADO CAMBIAR LA TEMPERATURA</h2> " +
    "<h2> del dispositivo "+ this.dev[Number(dev)] + " a la temperatura de " + temp +"</h2> " +
    "<h3> recuerda que el usuario "+ userName + " es un Niño. ¿Desea completar la solicitud de cambio de temperatura?</h3> " +
    "<a href='http://localhost:3700/api/change-temperature-device/"+id+"/"+dev+ "/" + temp+"'> <button>Aceptar</button> </a> "
    
    // "<button type='button' class='btn btn-success' (click)='http:///change-temperature-device/"+id+"/"+dev+ "/" + temp+">Encender </button>"
    "<h4>¿Fuiste tú? Si no fuiste tú. Ponte en contacto con los servicios de CloudS</h4>" + 
    
    "</div>"

    this.mail = new Correo("Cambio de Temperatura", correo, "", corr);
          this._aireService.sendEmail(this.mail).subscribe(
            response =>{
              if(response.mail){
                console.log("CORREO ENVIADO");
              }
            }, error=>{
              console.log(<any>error);
            });
  }


  getProgramabilityFromDevice(dev : Number, index : Number){
    this.actualIndex = index;
    
    this._userService.getProgramabilityFromUser(this.idUser , dev).subscribe(
      response =>{
        if(response){
          this.program = response;
          console.log(this.program);
          this.offattime = this.program.offat;
          this.onattime = this.program.onat;
          this.online = this.program.online
          this.configWasSelected = 3;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  updateProgramability(){
    this.updateProgram = new Programability(this.onattime,this.offattime, this.online);
    console.log(this.updateProgram);
    this._userService.updateProgramabilityFromDevice(this.idUser, this.actualIndex, this.updateProgram).subscribe(
      response =>{
        if(response){
            
          //this.getProgramabilityFromDevice(this.actualIndex, this.actualIndex);
          this.getDevices(this.idUser? this.idUser : "");
        }
      },error =>{
        console.log(<any>error);
      }
    )
    this.unselect();
  }

  objectKeys (objeto: any) {
    const keys = Object.keys(objeto);
    console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return keys;
 }

 unselect(){
  this.configWasSelected = 0;
 }

}
