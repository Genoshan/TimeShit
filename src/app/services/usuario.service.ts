import { UsuarioComponent } from "./../components/usuario/usuario.component";
import "rxjs/Rx";
import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  HttpModule,
  RequestOptions
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Usuario } from "../interfaces/usuario";
import { IfObservable } from "rxjs/observable/IfObservable";


@Injectable()
export class UsuarioService {
  email: string;
  pass: string;

  private Usuario: {
    nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };
  private url: string;

  constructor(private _http: Http) {
    //esto tiene que estar en un GLOBAL
    this.url = "http://Dev-Pc:81/api/";
  }

  login(email: string, pass: string) {
    let params = JSON.stringify({ pUsuario: email, pClave: pass });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .post(
        this.url + "LoginUsuario?pUsuario=" + email + "&pClave=" + pass,
        params
      )
      .map((res: any) => { 
        
        /*"Nombre": "Claudio Martín Bevegni Martos",
        "Email": "martin.bevegni@arkanosoft.com",
        "Img": "",
        "CI": "4279633-8"*/
         //console.log(res['Nombre']); 
         this.Usuario = res.json();
                  
          if (this.Usuario["Nombre"]!=null)
          {
            console.log(this.Usuario["Nombre"]);
            localStorage.setItem('usuario',JSON.stringify(this.Usuario));
            return true;
          }
        else {
          console.log(this.Usuario["Nombre"] + " " +  "No entro vieja!");
          return false;
        }
        
      });
  }
}
