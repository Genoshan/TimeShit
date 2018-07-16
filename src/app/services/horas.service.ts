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
    this.url = "http://localhost:88/api/";
   }

  getHoras(key$: number) {}
   
  getHora(id: number) {
    return (this.Hora = this.horas.find(x => x.IdHora == id));
  }

   

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
        console.log(this.horas);  
        if (this.horas.length > 0) {
          return this.horas;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }


  //BUSCADOR DE HORAS
  getHorasxTermino(termino: string) {
    return this.horas.filter(
      x => x.Descripcion.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
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


    //crear tarea
    CargarHoras(h: Hora, documento:string) {
    console.log(h);

    //    let body:any = JSON.stringify({ t });
    
    var body = {
      "<pHoras>kBackingField" : {
        IdHora:h.IdHora,
        IdTarea: h.IdTarea,            
        Descripcion: h.Descripcion,
        CantidadHoras: h.CantidadHoras,
        Fecha: h.Fecha
      },
      "<pDocumento>kBackingField" : documento
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'CargarHorasATarea', body, { headers: headers })
      .map((resp: any) => {
        //swal('Tarea Actualizada', t.Nombre, 'success');
        console.log(resp);
        return resp;
      })
      .catch(this.handleError);
  }

  //editar hora
  editarHoras(h: Hora) {
    console.log(h);
    var body = {
        IdHora: h.IdHora,
        IdTarea: h.IdTarea,            
        Descripcion: h.Descripcion,
        CantidadHoras: h.CantidadHoras,
        Fecha: h.Fecha      
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'EditarHoras', body, { headers: headers })
      .map((resp: any) => {
        
        console.log(resp);
        return resp;
      })
      .catch(this.handleError);
  }
}
