import { UsuarioComponent } from './../components/usuario/usuario.component';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Usuario } from '../interfaces/usuario';


@Injectable()
export class UsuarioService {

  private Usuario:{
    nombre: string,
    email: string,
    password: string,
    img: string,
    ci: number
  };
  private url: string;

  
  constructor(private _http:Http) {

    this.url = "http://192.168.0.106:83/api/loginusuario?pUsuario=felip.lima@arkanosoft.com&pClave=inicio123";

   }

   login(Usuario)
   {
     let params = JSON.stringify(this.Usuario.email);
     let headers = new Headers({'Content-Type':'application/json'});

     return this._http.post(this.url+'register',params,{headers: headers})
        .map(res=>res.json());
   }


}
