import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import swal from'sweetalert2';


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
    swal.fire({
      title: '¿Cerrar Sesión?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Cerrar Sesión',
      icon : "warning"
      //denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.idUser = null;
        this._userService.setNewStateToUser(String(this.idUser), 0, this.index).subscribe(
          response =>{
            //console.log("Estado cambiado");
            
        }, error =>{
          console.log(<any>error);
          console.log("Datos Incorrectos");
    
          
        });

      } else if (result.isDenied) {
        //swal.fire('Cancelado', '', 'info')
      }
    })
   
  }
 
}


