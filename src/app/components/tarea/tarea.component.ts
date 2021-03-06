import { TareasService } from './../../services/tareas.service';
import { ProyectosService } from '../../services/proyectos.service';
import { Component, OnInit } from '@angular/core';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Tarea } from '../../interfaces/tarea';
import { Proyecto } from './../../interfaces/proyecto';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';



@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styles: []
})
export class TareaComponent implements OnInit {
  
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date'
  };

  /*****ATRIBUTOS******/  

  nuevo:boolean=false;
  id:string;
  proyectos:Proyecto[] = [];

   tarea:Tarea = {

    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio:new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto:0  
  }

  user: Usuario = {
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }

  proyecto:Proyecto = {
    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    IdProyecto: 0,
  }

  status:string;
 

/********CONSTRUCTOR******/

constructor(private ts:TareasService,private pr:ProyectosService,
  private activatedRoute:ActivatedRoute){
  this.activatedRoute.params
    .subscribe(parametros => {        
      this.id = parametros['id'];
    } )

    this.options = new NgDatepickerModule();
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

  crearTareas(){
  if (this.id=="nueva")
  {
    // insertando
    
    this.ts.crearTareas(this.tarea)
    .subscribe(        
      correcto => { 
        if(correcto)
        {
          //this.proyectos = JSON.parse(correcto.proyectos);
          this.tarea = correcto;
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
  else
  {
    //actualizando
    
    this.ts.editarTarea(this.tarea)   
    .subscribe(        
      correcto => { 
        if(correcto)
        {
          //this.proyectos = JSON.parse(correcto.proyectos);
          this.tarea = correcto;
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
     
  this.user=JSON.parse(localStorage.getItem('usuario'));
  this.proyecto = JSON.parse(localStorage.getItem('proyecto'));  
  //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA  
  this.getTarea();    
  this.proyectos.push(this.proyecto);
}

}
