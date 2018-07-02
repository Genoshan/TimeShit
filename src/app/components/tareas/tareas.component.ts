import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tarea } from '../../interfaces/tarea';
import { TareasService } from '../../services/tareas.service';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: []
})
export class TareasComponent implements OnInit {

  tareas:Tarea[] = [];
  id: number;
  loading:boolean;

  tarea:Tarea = {

    Id: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio:new Date(Date.now()),
    FechaFIn: new Date(Date.now())  
  }
  status: string;

  constructor(private tservice: TareasService,
              private router:Router,
              private route: ActivatedRoute) {
                 
    this.route.params
    .subscribe( parametros =>{
      this.id = parametros['id']
      console.log(parametros['id']);      
} );
}

buscar(termino: string) {
  this.loading = true;
  this.tareas=this.tservice.getTareasxTermino(termino);
  
}
  ngOnInit() {
     //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
     this.tservice.getTareasDeProyecto(this.id)
     .subscribe(        
     correcto => { 
       if(correcto)
       {
         //this.proyectos = JSON.parse(correcto.proyectos);
         this.tareas = correcto;
         console.log(this.tareas);
           //<Proyecto[] > correcto.json()
          
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
