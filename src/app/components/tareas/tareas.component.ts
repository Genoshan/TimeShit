import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tarea } from '../../interfaces/tarea';
import { TareasService } from '../../services/tareas.service';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: []
})
export class TareasComponent implements OnInit {

  tareas:Tarea[] = [];
  id: number;
  loading:boolean;
  
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

  constructor(private tservice: TareasService,private pservice: ProyectosService,
              private router:Router,
              private route: ActivatedRoute) {
                 
    this.route.params
    .subscribe( parametros =>{
      this.id = parametros['id']            
} );
}

buscar(termino: string) {
  this.loading = true;
  this.tareas=this.tservice.getTareasxTermino(termino);
  
}
  ngOnInit() {

    //OBTENGO EL PROYECTO
    this.proyecto=this.pservice.getProyecto(this.id);

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('proyecto',JSON.stringify(this.proyecto)); 

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
     this.tservice.getTareasDeProyecto(this.id)
     .subscribe(        
     correcto => { 
       if(correcto)
       {
         //this.proyectos = JSON.parse(correcto.proyectos);
         this.tareas = correcto;
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
