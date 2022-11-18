import { Component, OnInit } from '@angular/core';
import { AireService } from 'src/app/services/aire.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Correo } from 'src/app/models/correo';
import { ThisReceiver } from '@angular/compiler';
import { Username } from 'src/app/models/username';
import { RouterLink } from '@angular/router';
//import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import swal from'sweetalert2';


@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css'],
  providers: [UserService]
})
export class IniciarsesionComponent implements OnInit {
  public status : number;
  public use: User;
  public mail: Correo;
  public username : Username[];
  public userOk = false;
  public index : number = 0;
  public idUser = "";
  public userData = {
    id: "",
    username: "",
    password: ""
  }
  
  constructor(
    private _userService : UserService,
    private _aireService : AireService
  ) {
    //this.allUsers = [];
    this.status = 3;
    this.mail = new Correo('','','','');
    this.username = [];
    this.use = new User('',[],'','');
  }

  ngOnInit(): void {
  }

  getUser(id : String){
    this._userService.getUser(id).subscribe(
      response =>{
        this.use = response.user
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  iniciarSesion(form: string){
    if(this.userData.id == ""){
      console.log("No ID");
      this.status = 2;
    }
    else if(this.userData.password == ""){
      console.log("No pass");
      this.status = 2;
    }
    else{
      
    this._userService.getUser(form).subscribe(
      response =>{
        this.use = response.user;
        
        this.username = response.user.Username;
        console.log(this.username);
        for(var i = 0; i < this.username.length ; i++){
          // console.log(i + " " + this.username[i].username);
           console.log(this.userData.username);
          if(this.userData.username == this.username[i].username){
            if(this.userData.password == this.use.Password){
              //console.log(this.use);
              
              console.log("OK CONTRASEÑA");
              //console.log(this.idUser + "   " + this.index);
              
              //console.log(this.use.Email);
              this.index = i;
              this.idUser = this.userData.id;
              console.log(this.idUser);
              this.setOnlineUser();
              sessionStorage.setItem('idUser', this.use._id);
              sessionStorage.setItem('user', this.use.Username[i].username);
              sessionStorage.setItem('rol', String(this.use.Username[i].rol));
              sessionStorage.setItem('estado', String(this.use.Username[i].estado));
              sessionStorage.setItem('index', String(i));
              sessionStorage.setItem('online', String(this.use.Username[i].online));
              sessionStorage.setItem('correo', this.use.Email);
              //this.sendCorreo(this.use.Email, this.use.Username[i].username);
              
              window.open("http://localhost:4200/devices","_self");
              this.userOk = true;
              //console.log("Variable Session: " + sessionStorage.getItem('idUser'));
              //6358513ad81e6ca96b2d6eb1
            }else{
              console.log("Datos Incorrectos");
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Datos< Incorrectos'
              })
              sessionStorage.clear();
              this.status = 1;
              break;
            }
            break;
          } else{
            this.userOk = false;
          }
        }
      
        
        
    }, error =>{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos Incorrectos',
        footer: ''
      })
      console.log(<any>error);
      console.log("Datos Incorrectos");
      this.status = 1;
      //this.status = 0;
      this.clearDataUser();
      
    });
    
      
    
    
    }
    
  }
  setOnlineUser(){
    //console.log(this.idUser);
    this._userService.setNewStateToUser(this.idUser, 1, this.index).subscribe(
      response =>{
        console.log("Estado cambiado");
        
    }, error =>{
      console.log(<any>error);
      console.log("Datos Incorrectos");
      this.status = 1;
      //this.status = 0;
      this.clearDataUser();
      
    });
  }

  clearDataUser(){
    //this.username = new Username('',9,0,1);
    this.use = new User('',this.username,'','');
  }

  sendCorreo(correo : string, userName : string){
    var corr = 
   
    "<div style='text-align: center;'> " +
    "<a href='https://imgbb.com/'><img src='https://i.ibb.co/sg5Yc8N/logo.png' alt='logo' border='0'></a>" +
    "<h1>Nuevo Inicio de Sesión</h1> " +
    "<h2> El usuario "+ userName + " ha iniciado sesión</h2> " +
    "<h4>¿Fuiste tú? Si no fuiste tú. Ponte en contacto con los servicios de CloudS</h4>" + 
    
    "</div>"

    this.mail = new Correo("Nuevo Inicio de Sesión", correo, "", corr);
          this._aireService.sendEmail(this.mail).subscribe(
            response =>{
              if(response.mail){
                console.log("CORREO ENVIADO");
              }
            }, error=>{
              console.log(<any>error);
            });
  }
}

