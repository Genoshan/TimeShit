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

//Para Hacer Catch de errores
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UsuarioService {
  email: string;
  pass: string;

  private Usuario: {
    Nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };
  private url: string;

  constructor(private _http: Http) {
    //esto tiene que estar en un GLOBAL
    this.url = "http://localhost:88/api/";
  }

  login(email: string, pass: string) {
    let params = JSON.stringify({ pUsuario: email, pClave: pass });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .get(
        this.url + "LoginUsuario?pUsuario=" + email + "&pClave=" + pass,
        params
      )
      .map((res: any) => { 
                
         this.Usuario = res.json();
                  
          if (this.Usuario["Nombre"]!=null)
          {            
            localStorage.setItem('usuario',JSON.stringify(this.Usuario));
            return true;
          }
        else {          
          return false;
        }
        
      })
      .catch(this.handleError); 
  }

  //MANEJADOR DE ERRORES DE SERVICIO  
  private handleError(error: any) {
    
    let error1 = error.json();    
    let errMsg = error1["ExceptionMessage"]
      ? error1["ExceptionMessage"]
      : error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    return Observable.throw(errMsg);
  }
}
