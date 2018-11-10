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
import { IfObservable } from "rxjs/observable/IfObservable";
import { Usuario } from "../interfaces/usuario";
import { Proyecto } from "./../interfaces/proyecto";

//Para Hacer Catch de errores
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProyectosService {
  private Proyecto: {
    IdProyecto: number;
    FechaInicio: Date;
    Estado: boolean;
    CodigoProyecto: string;
  };

  private Usuario: {
    nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };

  private proyectos: Proyecto[] = [];

  private url: string; 

  private proyectosxtermino: Proyecto[] = [
    {
      IdProyecto: 0,
      FechaInicio: new Date(Date.now()),
      Estado: false,
      Nombre: "",
      CodigoProyecto: ""
    }
  ];

  private retornoListarProyectosDeUsuario=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        IdProyecto: 0,
        Nombre: "",
        FechaInicio: new Date(Date.now()),
        Estado: true,
        CodigoProyecto: ""
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoCrearProyecto=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEditarProyecto=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEliminarProyecto=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };


  constructor(private _http: Http) {
    //esto tiene que estar en un GLOBAL
    this.url = "http://localhost:88/api/";
    //this.url = "https://timesheetrestapi.azurewebsites.net/api/";
  }

  //METODOS

  getProyectos() {
    return this.proyectos;

    //Llamada al servicio de la API y traer por la CI
  }

  getProyectosUsuario(ci: string) {
    let params = JSON.stringify({ pCI: ci });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .get(this.url + "ListarProyectosDeUsuario?pDocumento=" + ci + "", params)
      .map((res: any) => {

        this.retornoListarProyectosDeUsuario = res.json();
        //console.log(this.retornoListarProyectosDeUsuario);
        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListarProyectosDeUsuario.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListarProyectosDeUsuario.Retorno.length>0)
          {
            
            this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListarProyectosDeUsuario;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoListarProyectosDeUsuario.Errores;
        }//fin nueva forma

        // this.proyectos = res.json();

        // if (this.proyectos.length > 0) {
        //   return this.proyectos;
        // } else {
        //   return false;
        // }
      })
      .catch(this.handleError);
  }

  getProyecto(id: number) {
    return (this.Proyecto = this.proyectos.find(x => x.IdProyecto == id));
  }

  getProyectoxTermino(termino: string) {
    return this.proyectos.filter(
      x => x.Nombre.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
  }

  //crear proyecto
  crearProyectos(p: Proyecto) {

    //let body:any = JSON.stringify({ t });

    var body = {      
      IdProyecto: p.IdProyecto,
      Nombre: p.Nombre,
      CodigoProyecto: p.CodigoProyecto,
      FechaInicio: p.FechaInicio,
      Estado: p.Estado
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'CrearProyecto', body, { headers: headers })
      .map((resp: any) => {
        this.retornoCrearProyecto = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoCrearProyecto.RetornoCorrecto==="S")
        {
          return this.retornoCrearProyecto;
        }
        else 
        {
          return this.retornoCrearProyecto.Errores;          
        }//fin nueva forma
        
      })
      .catch(this.handleError);
  }

//editarTarea
  editarProyecto(p: Proyecto) {
    //let headers = new Headers();
    var body = {      
      IdProyecto: p.IdProyecto,
      Nombre: p.Nombre,
      CodigoProyecto: p.CodigoProyecto,
      FechaInicio: p.FechaInicio,
      Estado: p.Estado
    };   

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'EditarProyecto', body, { headers: headers })
      .map((resp: any) => {
        console.log(resp.json());
        this.retornoEditarProyecto = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEditarProyecto.RetornoCorrecto==="S")
        {
          return this.retornoEditarProyecto;
        }
        else 
        {
          return this.retornoEditarProyecto.Errores;          
        }//fin nueva forma

      })
      .catch(this.handleError);
  }

  //eliminarTarea
  eliminarProyecto(k: Number) {
    //console.log(k);
    //let headers = new Headers();
    var body = k
    ;   

    //console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'EliminarProyecto', body, { headers: headers })
      .map((resp: any) => {
           
        this.retornoEliminarProyecto = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEliminarProyecto.RetornoCorrecto==="S")
        {
          return this.retornoEliminarProyecto.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEliminarProyecto.Errores;          
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
