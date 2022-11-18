import { Component, OnInit } from '@angular/core';
import { Aires } from 'src/app/models/aires';
import { global } from 'src/app/services/global';
import { AireService } from 'src/app/services/aire.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Correo } from 'src/app/models/correo';


@Component({
  selector: 'app-nuevoaire',
  templateUrl: './nuevoaire.component.html',
  styleUrls: ['./nuevoaire.component.css'],
  providers: [UserService]

})
export class NuevoaireComponent implements OnInit {
  public title: string;
  public use: User;
  public status: number;
  public mail: Correo;
  public PasswordConfirm: string;
  constructor(
    private _userService : UserService,
    private _aireService : AireService
  ) { 

    this.title = "Crear User";
    this.use = new User('',[],'','');
    this.mail = new Correo('','','','' );
    this.status = 2;
    this.PasswordConfirm = "";
  }

  ngOnInit(): void {
  }
  onSubmit(form: any){
    //console.log(this.project);
    this._userService
    this._userService.saveUser(this.use).subscribe(
      response =>{
        if(response.use){
          console.log("GUARDADO");
          this.status = 1;
          
        }else{
          this.status = 0;
        }
    }, error =>{
      console.log(<any>error);
      this.status = 0;
    });
    var corr = 
   
    "<div style='text-align: center;'> " +
    "<a href='https://imgbb.com/'><img src='https://i.ibb.co/sg5Yc8N/logo.png' alt='logo' border='0'></a>" +
    "<h1>BIENVENDO A LOS SERVICIOS DE CloudS</h1> " +
    "<h2>"+ this.use.Username + "</h2> " +
    "<h4> Esperamos que los servicios sean de tu agrado </h4> " +
    "<h4>Cualquier aclaración. Ponte en contacto con los servicios de CloudS</h4>" + 
    
    "</div>"

    this.mail = new Correo("Bienvenido", this.use.Email, "", corr);
          this._aireService.sendEmail(this.mail).subscribe(
            response =>{
              if(response.mail){
                console.log("CORREO ENVIADO");
              }
            }, error=>{
              console.log(<any>error);
            });
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
}
