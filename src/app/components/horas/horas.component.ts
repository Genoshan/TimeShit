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
    Idhora:0,
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

getHora(){
  if (this.id=="nueva")
  {
      
      //OBTENGO LA TAREA      
      this.hora.IdTarea = this.tarea.IdTarea;           
      this.tarea.IdProyecto = this.proyecto.IdProyecto;
      
      //OBTENGO EL PROYECTO
      this.proyecto = this.pr.getProyecto(Number(this.tarea.IdProyecto));
      
  }
  else{

    //OBTENGO LA HORA SEGUN SU ID
    this.hora=this.hs.getHora(Number(this.id));  
    //OBTENGO LA TAREA PARA LA HORA SELECCIONADA
    this.tarea=this.ts.getTarea(Number(this.hora.IdTarea));
    //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
    this.proyecto=this.pr.getProyecto(this.tarea.IdProyecto);
  }        
}

CargarHoras(){
    //creando
    if (this.id=="nueva")
    {
      
      this.hs.CargarHoras(this.hora, this.user["CI"])
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
  else
  {

    //actualizando    
    this.hs.editarHoras(this.hora)  
    .subscribe(        
      correcto => { 
        if(correcto)
        {
          //this.proyectos = JSON.parse(correcto.proyectos);
          this.hora = correcto;
          //console.log(this.tareas);
        }
        else{
          this.status = 'error';
          //alert('El usuario no esta');
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

  //OBTENGO, USUARIO, TAREA Y PROYECTO POR EL CUAL LLEGO DE LA NAVEGACION
  this.user=JSON.parse(localStorage.getItem('usuario'));
  this.tarea=JSON.parse(localStorage.getItem('tarea'));
  this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
  
  //Agrego la tarea y el proyecto a las listas locales de proyecto y tarea obtenidos por los servicios a cada combo

  this.proyectos.push(this.proyecto);
  this.tareas.push(this.tarea);
  this.getHora();  
}

}
