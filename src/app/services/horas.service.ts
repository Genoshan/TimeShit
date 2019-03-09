import { KeysPipe } from './../pipes/keys.pipe';
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
import { Horaefectiva } from './../interfaces/horaefectiva';
import { Observable } from "rxjs/Rx";
import { Tarea } from "../interfaces/tarea";
import { Usuario } from "../interfaces/usuario";

//Para Hacer Catch de errores
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HorasService {
  //ATRIBUTOS
  private horas: Hora[]=[];

  private horasefectivas: Horaefectiva[]=[];
  
  private url: string;

  private user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0
  }

  private Hora: {
    Idhora: number;
    Descripcion:string;
    CantidadHoras:number;
    Fecha:Date;
    IdTarea: number;
  };

  private retornoListarHorasDeProyectoyTarea=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        IdTarea: 0,      
      Descripcion: "",
      CantidadHoras: 0,
      Fecha: new Date(Date.now()),
      Idhora: 0
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoListadoHorasEfectivas={
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        "oProyecto": {
          "IdProyecto": 0,
          "Nombre": "",
          "FechaInicio": new Date(Date.now()),
          "Estado": true,
          "CodigoProyecto": ""
        },
        "oTarea": {
          "IdTarea": 0,
          "IdProyecto": 0,
          "Nombre": "",
          "Descripcion": "",
          "FechaInicio": new Date(Date.now()),
          "FechaFIn": new Date(Date.now())
        },
        "oHora": {
          "Idhora": 0,
          "IdTarea": 0,
          "Descripcion": "",
          "CantidadHoras": 1,
          "Fecha": new Date(Date.now())
        }
      }
    ],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoCrearHora=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEditarHora=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEliminarHora=
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
    this.url = "http://localhost:88/api/";
    //this.url = "https://timesheetrestapi.azurewebsites.net/api/";
   }

  getHoras(key$: number) {}
   
  getHora(id: number) {
    return (this.Hora = this.horas.find(x => x.Idhora == id));
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
        this.retornoListarHorasDeProyectoyTarea = res.json();
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListarHorasDeProyectoyTarea.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListarHorasDeProyectoyTarea.Retorno.length>0)
          {
            
            this.horas = this.retornoListarHorasDeProyectoyTarea.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListarHorasDeProyectoyTarea;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoListarHorasDeProyectoyTarea.Errores;
        }//fin nueva forma

        // this.horas = res.json();        
        // if (this.horas.length > 0) {
        //   return this.horas;
        // } else {
        //   return false;
        // }
      })
      .catch(this.handleError);
  }

  ListarHorasMensualesDeUsuario(ci:string){   
    
    var body = ci;  
    
    //console.log(body);

    let params = JSON.stringify({ pCI: ci });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    

    let options = new RequestOptions({ headers: headers });

    return this._http
      .get(this.url + "ListarHorasMensualesDeUsuario?pDocumento=" + ci + "", params)
      .map((res: any) => {

        this.retornoListadoHorasEfectivas = res.json();
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListadoHorasEfectivas.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListadoHorasEfectivas.Retorno.length>0)
          {
            
            this.horasefectivas = this.retornoListadoHorasEfectivas.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListadoHorasEfectivas;            
          }
          // else {
          //   return this.retornoListadoHorasEfectivas;
          // }
        }
        else
        {
          return this.retornoListadoHorasEfectivas.Errores;
        }//fin nueva forma

        // console.log(res);
        // this.horasefectivas = res.json();
        // console.log(this.horasefectivas);
        // if (this.horasefectivas.length > 0) {
        //   return this.horasefectivas;
        // } else {
        //   return false;
        // }

      })
      .catch(this.handleError);

  }


  //BUSCADOR DE HORAS
  getHorasxTermino(termino: string) {
    return this.horas.filter(
      x => x.Descripcion.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
  }

   //crear tarea
    
    CargarHoras(h: Hora, ci:string) {    
        
    var body = {
      "<pHoras>k__BackingField" : {
        IdHora:h.Idhora,
        IdTarea: h.IdTarea,            
        Descripcion: h.Descripcion,
        CantidadHoras: h.CantidadHoras,
        Fecha: h.Fecha
      },
      "<pDocumento>k__BackingField" : ci
    };    
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'CargarHorasATarea', body, { headers: headers })
      .map((resp: any) => {
        this.retornoCrearHora = resp.json();
        //console.log(this.retornoCrearHora);        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoCrearHora.RetornoCorrecto==="S")
        {
          return this.retornoCrearHora;
        }
        else 
        {
          return this.retornoCrearHora.Errores;          
        }//fin nueva forma

        //swal('Tarea Actualizada', t.Nombre, 'success');        
        //return resp;
      })
      .catch(this.handleError);
  }

  //editar hora
  editarHoras(h: Hora) {
    

    var body = {        
        Idhora:h.Idhora,
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
        this.retornoEditarHora = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEditarHora.RetornoCorrecto==="S")
        {
          //console.log(resp.json());
          return this.retornoEditarHora;
        }
        else 
        {
          //console.log(resp.json());
          return this.retornoEditarHora.Errores;          
        }//fin nueva forma
        
        //return resp;
      })
      .catch(this.handleError);
  }

  //eliminar hora
  eliminarHora(k: Number) {
    //console.log(k);
    
    var body =         
        k      
    ;
    
    //console.log(body);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(this.url + 'EliminarHora', body, { headers: headers })
      .map((res:any) => {
        this.retornoEliminarHora = res.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEliminarHora.RetornoCorrecto==="S")
        {
          return this.retornoEliminarHora.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEliminarHora.Errores;          
        }//fin nueva forma      
        
        //res.json()
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
