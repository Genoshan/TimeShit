
//Nueva API

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
import { Proyecto } from "../interfaces/proyecto";


@Injectable()
export class UsuarioService {
  email: string;
  pass: string;

  private Usuario: {
    Nombre: string;
    Email: string;
    //password: string,
    Img: string;
    CI: number;
  };
  private url: string;
  

  //nuevo objeto para manejar retornos
  private retornoLogin = {
    "RetornoCorrecto": "S",
    "Retorno": {
        "Nombre": null,
        "Email": null,
        "Img": null,
        "CI": null
    },
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
  }
};

private retornoUsuarios=
{
  "RetornoCorrecto": "S",
  "Retorno": [
    {
      Nombre: "",
  Email: "",
  //password: string,
  Img: "",
  CI: ""      
    }],
  "Errores": {
    "ExceptionType": null,
    "Mensaje": null,
    "Descripcion": null
  }
};

private retornoUsuariosAsignadosAProyecto=
{
  "RetornoCorrecto": "S",
  "Retorno": [
    {
      Nombre: "",
  Email: "",
  //password: string,
  Img: "",
  CI: ""      
    }],
  "Errores": {
    "ExceptionType": null,
    "Mensaje": null,
    "Descripcion": null
  }
};

private retornoAsignarUsuarioAProyecto = {
  "RetornoCorrecto": "S",
  "Retorno": false,
  "Errores": {
    "ExceptionType": null,
    "Mensaje": null,
    "Descripcion": null
  }
};

listausuariosaasignar:Usuario[]= [];
listausuariosasignadosaproyecto:Usuario[]= [];
listausuarios:Usuario[]= [];

  constructor(private _http: Http) {
    //esto tiene que estar en un GLOBAL
    this.url = "http://localhost:88/api/";
    //this.url = "https://timesheetrestapi.azurewebsites.net/api/";
  }

  //Asignar Usuarios a Proyectos
  asignarUsuarios(p: Proyecto, u: Usuario[]) {
    
    console.log(p);
    console.log(u);
    
    var body = {
      
      pUsuarios: u,
      pIdProyecto: p.IdProyecto
      
    };   

    let params = JSON.stringify({ pUsuarios: u, pIdProyecto: p.IdProyecto });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(
        //this.url + 'AsignarUsusarioAProyecto?'+"pDocumento=" + u.CI+"&pIdProyecto=" + p.IdProyecto, params)
        this.url + 'AsignarUsusarioAProyecto', body, { headers: headers })
      .map((resp: any) => {
        //console.log(resp);
        this.retornoAsignarUsuarioAProyecto = resp.json();        

        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables

        if (this.retornoAsignarUsuarioAProyecto.RetornoCorrecto==="S")
        {
          return this.retornoAsignarUsuarioAProyecto.RetornoCorrecto;
        }
        else 
        {
          return this.retornoAsignarUsuarioAProyecto.Errores;          
        }//fin nueva forma

        //forma vieja
        //return resp;

      })
      .catch(this.handleError);
  }


  getUsuarios(){

    //let params = JSON.stringify({ pIdProyecto: proyecto.IdProyecto );

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .get(
        this.url + "ListarUsuarios"        
      )
      .map((res: any) => { 

         this.retornoUsuarios = res.json();
         //console.log(res.json);

         //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
         if (this.retornoUsuarios.RetornoCorrecto==="S")
      {
        //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
        if (this.retornoUsuarios.Retorno.length>0)
        {
          
          this.listausuarios = this.retornoUsuarios.Retorno;
         // console.log(this.retornoUsuarios.Retorno);

          return this.retornoUsuarios;            
        }
        else {
          return false;
        }
      }
      else
      {
        return this.retornoUsuarios.Errores;
      }//fin nueva forma
    })
      .catch(this.handleError); 

}


getUsuariosAsignadosAProyecto(proyecto: Proyecto){  
  let params = JSON.stringify({ pIdProyecto: proyecto.IdProyecto });
console.log(proyecto);
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  return this._http
    .get(
      this.url + "ListaUsuariosAsignadoAProyecto?pIdProyecto=" + proyecto.IdProyecto+"",      
      params    
    )
    .map((res: any) => { 

       this.retornoUsuariosAsignadosAProyecto = res.json();

       //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
       if (this.retornoUsuariosAsignadosAProyecto.RetornoCorrecto==="S")
    {
      //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
      if (this.retornoUsuariosAsignadosAProyecto.Retorno.length>0)
      {
        
        this.listausuariosasignadosaproyecto = this.retornoUsuariosAsignadosAProyecto.Retorno;
        //console.log(this.retornoListarProyectosDeUsuario.Retorno);

        return this.retornoUsuariosAsignadosAProyecto;            
      }
      else {
        return false;
      }
    }
    else
    {
      return this.retornoUsuariosAsignadosAProyecto.Errores;
    }//fin nueva forma
  })
    .catch(this.handleError); 

}




  getUsuariosNoAsignadosDeProyecto(proyecto: Proyecto){

    let params = JSON.stringify({ pIdProyecto: proyecto.IdProyecto });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .get(
        this.url + "ListarUsuariosNoAsignadosDeProyecto?pIdProyecto=" + proyecto.IdProyecto+"",
        params
      )
      .map((res: any) => {        
        
         this.listausuariosaasignar = res.json();
                  
          if (this.listausuariosaasignar.length>0)
          {            
            return this.listausuariosaasignar;
          }
        else {
          
          return false;
        }
        
      })
      .catch(this.handleError); 

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

        /*FORMA ANTERIOR de obtener el retorno (el usuario)*/
        // this.Usuario = res.json();
        //  if (this.Usuario["Nombre"]!=null)
        //    {            
        //      localStorage.setItem('usuario',JSON.stringify(this.Usuario));
        //      return true;
        //    }
        //  else{          
        //      return false;
        //    }


        /*NUEVA FORMA DE OBTENER RETORNOS*/
        //obtengo el retorno con la  nueva forma
          this.retornoLogin = res.json();
        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
         if (this.retornoLogin.RetornoCorrecto==="S")
         {
           this.Usuario = this.retornoLogin.Retorno;
           if (this.Usuario["Nombre"]!=null)
          {            
            localStorage.setItem('usuario',JSON.stringify(this.Usuario));
            return this.retornoLogin.RetornoCorrecto;
          }
         }
        else {

          return this.retornoLogin.Errores;
        }//fin nueva forma
        
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
