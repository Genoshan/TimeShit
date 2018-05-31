import { Proyecto } from './../interfaces/proyecto';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProyectosService {
    
  private Proyecto:{
    id: number,    
    fechaInicio: Date,
    Estado: boolean,
    codigoProyecto: string
  };

  private proyectos:Proyecto[] = [{
    id: 1,    
    fechaInicio: new Date(Date.now()),
    Estado: true,
    codigoProyecto: "proyecto1"    
  },
  {

    id: 2,    
    fechaInicio: new Date(Date.now()),
    Estado: true,
    codigoProyecto: "proyecto2"
  },
  {

    id: 3,    
    fechaInicio: new Date(Date.now()),
    Estado: true,
    codigoProyecto: "proyecto3"
  }]


  constructor() { 

  }

  getProyectos(){
    return this.proyectos;
  }

  getProyecto(id:number){

    return this.Proyecto=this.proyectos.find(x => x.id == id);
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
