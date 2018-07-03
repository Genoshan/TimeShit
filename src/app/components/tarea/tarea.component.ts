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

  status:string;

  /*{
    "IdTarea": 1,
    "Nombre": "tin",
    "Descripcion": "sample string 3",
    "FechaInicio": "2018-07-01T20:20:25.2937825-03:00",
    "FechaFIn": "2018-07-01T20:20:25.2937825-03:00",
    IdProyecto: 1
  }*/

   

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
      }
      else{
        
        this.tarea=this.ts.getTarea(Number(this.id))
        this.tarea.IdProyecto=157;        
      }        
    }

  crearTareas(){
  if (this.id=="nuevo")
  {
    // insertando
    this.ts.crearTareas(this.tarea)
    /*.subscribe( data=>{
      this.activatedRoute.navigate(['/proyecto',data.name])
  },
  error=> console.error(error)
);*/

  }
  else
  {
    //actualizando
    console.log(this.id);
    this.ts.editarTarea(this.tarea, this.id)            
  }
}

/**** CARGA INICIAL DEL COMPONENTE *****/
ngOnInit() {
  this.getTarea();   
  this.user=JSON.parse(localStorage.getItem('usuario'));

  //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO        
  this.pr.getProyectosUsuario(this.user["CI"])
    .subscribe(        
    correcto => { 
      if(correcto)
      {
        this.proyectos = correcto;        
         
      }
      else{
        this.status = 'error';          
      }
  },(error) => {
    this.status = 'error';
    console.log(error);                    
    }) 
}

}
