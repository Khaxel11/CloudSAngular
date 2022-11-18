import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { Aires } from "../models/aires";
import { global } from "./global";
import {User} from "../models/user";
import { Correo } from "../models/correo";

@Injectable()
export class AireService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    saveAire (aire : Aires):Observable<any>{
        let params = JSON.stringify(aire);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-aire', params, {headers:headers});

    }
    // getAires() : Observable <any>{
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     return this._http.get(this.url+"Aires",{headers:headers});
    // }
    getAires(id : String) : Observable <any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+"aire/"+id,{headers:headers});
    }

    saveUser (us : User) : Observable<any>{
        let params = JSON.stringify(us);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-user', params, {headers:headers});
    }
    sendEmail (mail : Correo):Observable<any>{
        let params = JSON.stringify(mail);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'envio', params, {headers:headers});

    }
    

}
