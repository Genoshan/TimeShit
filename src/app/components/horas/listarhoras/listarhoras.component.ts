import { Component, OnInit } from '@angular/core';
import { Hora } from '../../../interfaces/hora';
import { Proyecto } from '../../../interfaces/proyecto';
import { Tarea } from '../../../interfaces/tarea';
import { TareasService } from '../../../services/tareas.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HorasService } from '../../../services/horas.service';

@Component({
  selector: 'app-listarhoras',
  templateUrl: './listarhoras.component.html',
  styleUrls: ['./listarhoras.component.css']
})
export class ListarhorasComponent implements OnInit {

  horas:Hora[] = [];
  
  id: number;
  loading:boolean;

   hora:Hora = {
    Idhora:0,
    Descripcion: "" ,
    CantidadHoras: 0,
    Fecha:new Date(Date.now()),
    IdTarea: 0,
  };

  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    IdProyecto: 0,
  }

  tarea:Tarea = {

    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio:new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0  
  }

  status: string;

  constructor(private tservice: TareasService,private pservice: ProyectosService, private hservice: HorasService,
    private router:Router,
    private route: ActivatedRoute) {
      this.route.params
      .subscribe( parametros =>{
        this.id = parametros['id']            
  });

  }


  buscar(termino: string) {
    this.loading = true;
    this.horas=this.hservice.getHorasxTermino(termino);    
  }

  borrarHora(k: Number) {
    this.loading = true;
    this.hservice.eliminarHora(k)
         .subscribe(        
         correcto => { 
           if(correcto)
           {            
            //vuelvo a cargar la lista
            this.horas = null;              
            this.listarHorasdeTarea();                 
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

  listarHorasdeTarea(){

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS      
    this.tarea = this.tservice.getTarea(this.id);      

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('tarea',JSON.stringify(this.tarea));          

         this.hservice.getHorasDeTarea(this.tarea)
         .subscribe(        
         correcto => { 
           if(correcto)
           {
            //vacio la lista de horas y la vuelvo a cargar
            this.horas = null;               
             this.horas = correcto;             
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

  ngOnInit() {

    //se realizó refactory de cargar la lista de horas en un metodo independiente que se pueda llamar 
    //desde cualquier parte del codigo de la clase.
    this.listarHorasdeTarea();
  }

}
