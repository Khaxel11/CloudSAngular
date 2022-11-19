import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Username } from 'src/app/models/username';
import { User } from 'src/app/models/user';
import swal from'sweetalert2';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css'],
  providers: [UserService]
})
export class UserdataComponent implements OnInit {
  public use: User;
  public username : Username[];

  public roles : String[] = ["Seleccionar", "Administrador", "Usuario", "invitado"];
  public configClick : number;
  public dropClick : Number = 9;
  public alluser : Username[];
  public idUser: String | null;
  public name : String | null;
  public rolstring : String | null = "";
  public rol : Number;
  public estado : Number;
  public online : Number;
  public adminrol : Number;
  public clickOnAdd: Number = 0;
  public indexConfig : Number = 9;
  public newUser = {
      username: "",
      rol: 9,
      estado: 9,
      online: 0
  }
  public updUser = {
    username: "",
    rol: 9,
    estado: 9,
    online: 0
}
  constructor(
    private _userService : UserService,

  ) { 
    this.alluser = [];
    this.username = [];
    this.use = new User('',[],'','');
    this.adminrol = 9;
    this.idUser = "";
    this.name = "";
    this.rol = 9;
    this.estado = 9;
    this.online = 9
    this.configClick =1;
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem('idUser');
    this.name = sessionStorage.getItem('user');
    this.rolstring = sessionStorage.getItem('rol');
    this.rol = parseInt(this.rolstring as string);
    console.log(this.idUser? this.idUser : "");
    console.log(this.rol);
    this.getUser(this.idUser as String);
  }
  getUser(id : String){
    this._userService.getUser(id).subscribe(
      response =>{
        this.use = response.user
        this.alluser = response.user.Username;
        console.log(this.alluser);
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  addUser(id : String | null){
    console.log(this.newUser);
    this._userService.addUser(id,this.newUser).subscribe(
      response =>{
        this.getUser(id as String);
        this.clickOnAdd = 0;
        swal.fire(
          'Agregado!',
          'Perfil Añadido',
          'success'
        )
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  
  clickDropProfile(){
    if(this.dropClick == 9){
      this.dropClick = 1;
    }else{
      this.dropClick = 9;
  }
}
  dropUser (id : String | null, index : Number){
    swal.fire({
      title: 'Estas seguro?',
      text: "Esta accion es irreversible, el perfil se borrara!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.dropProfile(id as String, index).subscribe(
          response =>{
            this.getUser(id as String);
            this.dropClick = 9;  
          },
          error =>{
            console.log(<any>error);
          }
          )
        swal.fire(
          'Eliminado!',
          'El perfil ha sido eliminado.',
          'success'
        )
      }
    })
    
  }
  clickAdd(){
    if(this.clickOnAdd == 1){
      this.clickOnAdd = 0;
    }
    else{
      
      this.clickOnAdd = 1;
    }
    
    console.log(this.clickOnAdd)
  }
  clickConfig(index : number){
    
    if(this.configClick == 1){
      this.configClick = 2;  
      this.updUser.username = this.alluser[index].username;
      this.updUser.estado = Number(this.alluser[index].estado);
      this.updUser.online = Number(this.alluser[index].online);
      this.updUser.rol = Number(this.alluser[index].rol);
      this.indexConfig = index
    }else{
      this.configClick = 1;  
    }
  }
  updateUser(id : String | null, index : Number){
    this._userService.updateUser(id,this.updUser, index).subscribe(
      response =>{
        this.getUser(id as String);
        //this.clickOnAdd = 0;
        this.configClick = 1;  
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
}


