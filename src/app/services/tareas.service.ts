import "rxjs/Rx";
import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  HttpModule,
  RequestOptions
} from "@angular/http";
import { Tarea } from '../interfaces/tarea';
import { Observable } from "rxjs/Rx";

@Injectable()
export class TareasService {

  private tareas:Tarea[] = [];
  private url: string;

  constructor(private _http: Http) { 
    
    //esto tiene que estar en un GLOBAL
    this.url = "http://localhost:88/api/";  

  }

  getTareas(key$:number){  }

//OBTENER TAREAS DE UN PROYECTO DESDE LA API
  getTareasDeProyecto(Id: number) {
    let params = JSON.stringify({ pId: Id });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .post(
        this.url + "ListarTareasDeProyecto?pIdProyecto=" + Id+"",
        params
      )
      .map((res: any) => {         
        
         this.tareas = res.json();
                  
          if (this.tareas.length>0)
          {            
            return this.tareas;
          }
        else {          
          return false;
        }
        
      })
      .catch(this.handleError); 
  }
  
  //BUSCADOR DE TAREAS
  getTareasxTermino(termino:string){

    return this.tareas.filter(x => x.Nombre.toLowerCase().indexOf(termino.toLowerCase()) > -1);
    
  }

  //MANEJADOR DE ERRORES DE SERVICIO
  private handleError(error:any)
  { 
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }
}
