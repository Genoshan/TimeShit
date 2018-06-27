import { Proyecto } from './../interfaces/proyecto';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ProyectosService {
    
  private Proyecto:{
    id: number,    
    fechaInicio: Date,
    Estado: boolean,
    codigoProyecto: string
  };
  
  private proyectosxtermino:Proyecto[] = [{
    id: 0,    
    fechaInicio: new Date(Date.now()),
    Estado: false,
    codigoProyecto: ""    
  }];

  private proyectos:Proyecto[] = [];


  constructor() { 

    //CREACION DE PROYECTOS EN MEMORIA
    for(let i=1;i<=100;i++)
    {
      this.Proyecto={id:i,fechaInicio:new Date(Date.now()), Estado:true,codigoProyecto:"proyecto"+i};      
      this.proyectos.push(this.Proyecto);
    }

  }

  getProyectos(){
    return this.proyectos;
    //Llamar al servicio de la API y traer por la CI
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

}
