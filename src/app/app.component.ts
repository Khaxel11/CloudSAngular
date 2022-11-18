import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Username } from 'src/app/models/username';
import { User } from 'src/app/models/user';
import { Device } from 'src/app/models/device';
import { Analytics } from 'src/app/models/analytics';
import { temperatureChange } from 'src/app/models/temperatureChange';
import { stateChange } from 'src/app/models/stateChange';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent {
  title = 'iot';
  constructor(
    private _userService : UserService
    ){
        
    }
    idUser: String | null = sessionStorage.getItem('idUser');
    index : Number = Number(sessionStorage.getItem('index'));

  setOnlineUser(){
    //console.log(this.idUser);
    this._userService.setNewStateToUser(String(this.idUser), 0, this.index).subscribe(
      response =>{
        console.log("Estado cambiado");
        
    }, error =>{
      console.log(<any>error);
      console.log("Datos Incorrectos");
      //this.status = 1;
      //this.status = 0;
     // this.clearDataUser();
      
    });
  }
 
}


