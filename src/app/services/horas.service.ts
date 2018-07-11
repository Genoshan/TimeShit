import "rxjs/Rx";
import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  HttpModule,
  RequestOptions
} from "@angular/http";

import { Hora } from './../interfaces/hora';
import { Observable } from "rxjs/Rx";
import { jsonEval } from "@firebase/util";
import { Tarea } from "../interfaces/tarea";
import { Usuario } from "../interfaces/usuario";

@Injectable()
export class HorasService {
  //ATRIBUTOS
  private horas: Hora[]=[];
  private url: string;


  user: Usuario = {
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }
  
  

  private Hora: {
    Descripcion:string;
    CantidadHoras:number;
    Fecha:Date;
    IdTarea: number;
  };

  constructor(private _http: Http) {
    this.url = "http://localhost:80/api/";
   }

   

   getHoras(key$: number) {}

/*    getHora(id: number) {
    return (this.Hora = this.horas.find(x => x.IdTarea == id));
  } */


  getHorasDeTarea(t: Tarea) {
    this.user=JSON.parse(localStorage.getItem('usuario'));
    let params = JSON.stringify({ pIdProyecto: t.IdProyecto, pIdTarea: t.IdTarea, pDocumento: this.user["CI"]});   

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this._http
      .get(this.url + "ListarHorasDeTareaDeUsuario?pIdProyecto=" + t.IdProyecto +  "&" + "pIdTarea=" + t.IdTarea + "&" + "pDocumento=" + this.user["CI"] + "" , params)
      .map((res: any) => {
        this.horas = res.json();

        if (this.horas.length > 0) {
          return this.horas;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

    //MANEJADOR DE ERRORES DE SERVICIO
    private handleError(error: any) {
      let errMsg = error.message
        ? error.message
        : error.status
          ? `${error.status} - ${error.statusText}`
          : "Server error";
      return Observable.throw(error);
    }

      //BUSCADOR DE HORAS
  getHorasxTermino(termino: string) {
    return this.horas.filter(
      x => x.Descripcion.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
  }

}
