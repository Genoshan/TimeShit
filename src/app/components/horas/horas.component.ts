import { Usuario } from './../../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { Hora } from './../../interfaces/hora';

import { Tarea } from './../../interfaces/tarea';
import { Proyecto } from '../../interfaces/proyecto';



import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { TareasService } from '../../services/tareas.service';
import { ProyectosService } from '../../services/proyectos.service';
import { HorasService } from '../../services/horas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styles: []
})
export class HorasComponent implements OnInit {

  /*****ATRIBUTOS******/  

  nuevo:boolean=false;
  id:string;

  proyectos:Proyecto[] = [];
  tareas:Tarea[] = [];

  user: Usuario = {
    nombre: "",
    email: "",    
    img: "",
    ci: ""
  }

  hora:Hora={
    
    Descripcion:"",
    CantidadHoras:0,
    Fecha:new Date(Date.now()),
    IdTarea: 0

  }

  proyecto:Proyecto= {
      
    FechaInicio:new Date(Date.now()),
    Estado:true,
    Nombre:"",
    codigoProyecto:"",
    IdProyecto: 0,    
}

tarea:Tarea = {

  IdTarea: 0,
  Nombre: "",
  Descripcion: "",
  FechaInicio:new Date(Date.now()),
  FechaFIn: new Date(Date.now()),
  IdProyecto:0  
}

status:string;
    

constructor(private ts:TareasService,private pr:ProyectosService, private hs:HorasService,
  private activatedRoute:ActivatedRoute){
  this.activatedRoute.params
    .subscribe(parametros => {        
      this.id = parametros['id'];
    } )    
}

/*****OPERACIONES*****/

getTarea(){
  if (this.id=="nueva")
  {
      //console.log(this.proyecto);
      this.tarea.IdProyecto = this.proyecto.IdProyecto;
  }
  else{

    this.tarea=this.ts.getTarea(Number(this.id));
    //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
    this.proyecto=this.pr.getProyecto(this.tarea.IdProyecto);

  }        
}

CargarHoras(){
  {
    // insertando
    console.log(this.hora);
    this.hs.CargarHoras(this.hora, this.user.ci)
    .subscribe(        
      correcto => { 
        if(correcto)
        {          
          this.hora = correcto;          
        }
        else{
          this.status = 'error';          
        }
    },(error) => {
      this.status = 'error';
      console.log(error);                    
      } 
    )
  }
}

/**** CARGA INICIAL DEL COMPONENTE *****/
ngOnInit() {
     
  this.user=JSON.parse(localStorage.getItem('usuario'));
  //this.proyecto = JSON.parse(localStorage.getItem('proyecto'));  

  //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA  
  
  //this.getTarea();   
  
  //CARGAR DropDown con Lista de proyecto y tarea

  //Asignamos el id de la tarea de la hora

  this.hora.IdTarea = (Number(this.id));



  this.tarea=this.ts.getTarea(Number(this.hora.IdTarea));

  this.proyecto=this.pr.getProyecto(this.tarea.IdProyecto);

  //Agrego la tarea a las listas locales de proyecto y tarea obtenidos por los servicios a cada combo

  this.proyectos.push(this.proyecto);
  this.tareas.push(this.tarea);
}

}
