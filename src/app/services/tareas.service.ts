


//Nueva API

import "rxjs/Rx";
import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  HttpModule,
  RequestOptions
} from "@angular/http";
import { Tarea } from "../interfaces/tarea";
import { Observable } from "rxjs/Rx";

//Para Hacer Catch de errores
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TareasService {
  //ATRIBUTOS
  private tareas: Tarea[] = [];
  private url: string;
  private Tarea: {
    IdTarea: number;
    Nombre: string;
    Descripcion: string;
    FechaInicio: Date;
    FechaFIn: Date;
    IdProyecto: number;
  };

  private retornoListarTareasDeProyecto=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        IdTarea: 0,
      Nombre: "",
      Descripcion: "",
      FechaInicio: new Date(Date.now()),
      FechaFIn: new Date(Date.now()),
      IdProyecto: 0
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoCrearTarea=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEditarTarea=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEliminarTarea=
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

  getTareas(key$: number) {}

  //OBTENER TAREA POR SU ID
  getTarea(id: number) {
    return (this.Tarea = this.tareas.find(x => x.IdTarea == id));
  }

  //OBTENER TAREAS DE UN PROYECTO DESDE LA API
  getTareasDeProyecto(Id: number) {
    let params = JSON.stringify({ pId: Id });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .get(this.url + "ListarTareasDeProyecto?pIdProyecto=" + Id + "", params)
      .map((res: any) => {

        this.retornoListarTareasDeProyecto = res.json();
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
      if (this.retornoListarTareasDeProyecto.RetornoCorrecto==="S")
      {
        //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
        if (this.retornoListarTareasDeProyecto.Retorno.length>0)
        {
          
          this.tareas = this.retornoListarTareasDeProyecto.Retorno;
          //console.log(this.retornoListarProyectosDeUsuario.Retorno);

          return this.retornoListarTareasDeProyecto;            
        }
        else {
          return false;
        }
      }
      else
      {
        return this.retornoListarTareasDeProyecto.Errores;
      }//fin nueva forma

        // this.tareas = res.json();
        // if (this.tareas.length > 0) {
        //   return this.tareas;
        // } else {
        //   return false;
        // }
      })
      .catch(this.handleError);
  }

  //BUSCADOR DE TAREAS
  getTareasxTermino(termino: string) {
    return this.tareas.filter(
      x => x.Nombre.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
  }

  //crear tarea
  crearTareas(t: Tarea) {

    //let body:any = JSON.stringify({ t });

    var body = {
      IdTarea: t.IdTarea,
      IdProyecto: t.IdProyecto,
      Nombre: t.Nombre,
      Descripcion: t.Descripcion,
      FechaInicio: t.FechaInicio,
      FechaFIn: t.FechaFIn
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'CrearTarea', body, { headers: headers })
      .map((resp: any) => {
        this.retornoCrearTarea = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoCrearTarea.RetornoCorrecto==="S")
        {
          return this.retornoCrearTarea;
        }
        else 
        {
          return this.retornoCrearTarea.Errores;          
        }//fin nueva forma
        
        //swal('Tarea Actualizada', t.Nombre, 'success');        
        //return resp;
      })
      .catch(this.handleError);
  }

//editarTarea
  editarTarea(t: Tarea) {
    //let headers = new Headers();
    var body = {
      IdTarea: t.IdTarea,
      IdProyecto: t.IdProyecto,
      Nombre: t.Nombre,
      Descripcion: t.Descripcion,
      FechaInicio: t.FechaInicio,
      FechaFIn: t.FechaFIn
    };   

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'EditarTarea', body, { headers: headers })
      .map((resp: any) => {
        //swal('Tarea Actualizada', t.Nombre, 'success');        
        //return resp;

        //retornoEditarTarea
        this.retornoEditarTarea = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEditarTarea.RetornoCorrecto==="S")
        {
          return this.retornoEditarTarea.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEditarTarea.Errores;          
        }//fin nueva forma

      })
      .catch(this.handleError);
  }

  //eliminarTarea
  eliminarTarea(k: Number) {
    console.log(k);
    //let headers = new Headers();
    var body = k
    ;   

    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'EliminarTarea', body, { headers: headers })
      .map((resp: any) => {
        //swal('Tarea Actualizada', t.Nombre, 'success');
        //console.log(resp);
        //return resp;        
        this.retornoEliminarTarea = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEliminarTarea.RetornoCorrecto==="S")
        {
          return this.retornoEliminarTarea.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEliminarTarea.Errores;          
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
