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
import { Proyecto } from './../interfaces/proyecto';


@Injectable()
export class ProyectosService {
  
  private Proyecto:{
    id: number,    
    fechaInicio: Date,
    Estado: boolean,
    codigoProyecto: string
  };

  private Usuario: {
    nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };

  private proyectos:Proyecto[] = [];
  
  private url: string;
  
  //METODOS
  
  private proyectosxtermino:Proyecto[] = [{
    id: 0,    
    fechaInicio: new Date(Date.now()),
    Estado: false,
    codigoProyecto: ""    
  }];




  constructor(private _http: Http) { 
    
    //esto tiene que estar en un GLOBAL
    this.url = "http://localhost:88/api/";

    //CREACION DE PROYECTOS EN MEMORIA
    for(let i=1;i<=100;i++)
    {
      this.Proyecto={id:i,fechaInicio:new Date(Date.now()), Estado:true,codigoProyecto:"proyecto"+i};      
      this.proyectos.push(this.Proyecto);
    }

  }

  getProyectos(){
    return this.proyectos;
    
    //Llamada al servicio de la API y traer por la CI
  }

  getProyectosUsuario(ci: string) {
    let params = JSON.stringify({ pCI: ci });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .post(
        this.url + "ListarProyectosDeUsuario?pDocumento=" + ci+"",
        params
      )
      .map((res: any) => { 
        
        /*"Nombre": "Claudio Martín Bevegni Martos",
        "Email": "martin.bevegni@arkanosoft.com",
        "Img": "",
        "CI": "4279633-8"*/
         //console.log(res['Nombre']); 
         this.proyectos = res.json();
                  
          if (this.proyectos.length>0)
          {
            //console.log(this.proyectos);            
            return this.proyectos;
          }
        else {
          //console.log(this.proyectos + " " +  "No tenes proyectos vieja!");
          return false;
        }
        
      })
      .catch(this.handleError); 
  }  
  
  getProyecto(id:number){

    return this.Proyecto=this.proyectos.find(x => x.id == id);
  }

  getProyectoxTermino(termino:string){

    return this.proyectos.filter(x => x.codigoProyecto.toLowerCase().indexOf(termino.toLowerCase()) > -1);
    
  }

  crearProyectos(p: Proyecto){
    
    p.id=this.proyectos.length+1;
    
    this.proyectos.push(p);
    console.log(this.proyectos);

    //return this.proyectos;
  }

  editarProyectos(p: Proyecto, id:string ){

    //Proyecto proy= this.proyectos.find(p;
    let projectoaux = this.proyectos.find(x => x.id == Number(id));         
    let index = this.proyectos.indexOf(projectoaux);
    this.proyectos[index]=projectoaux;    
    
    //return this.proyectos;
  }

  //MANEJADOR DE ERRORES DE SERVICIO
  private handleError(error:any)
  { 
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

}
