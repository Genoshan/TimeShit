import { HttpModule } from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tarea } from '../../interfaces/tarea';
import { TareasService } from '../../services/tareas.service';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto';
import swal from 'sweetalert2';


import {Location} from '@angular/common';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  
  tareas:Tarea[] = [];
  id: number;
  loading:boolean;
  p: number = 1;
  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    CodigoProyecto:"",    
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
              private route: ActivatedRoute,
              private _location: Location) {
                 
    this.route.params
    .subscribe( parametros =>{
      this.id = parametros['id']            
} );
}

//Ir Atras
backClicked() {
  this._location.back();
}

buscar(termino: string) {
  this.loading = true;
  this.tareas=this.tservice.getTareasxTermino(termino);
  
}

borrarTarea(k: Number) {  

  //console.log('antesdelswal');
  swal({
    title: 'La tarea se eliminará, está seguro?',
    text: "La tarea no se podrá recuperar.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, confirmo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {    
    if (result.value) {
      { 
        //llamo al metodo
        this.tservice.eliminarTarea(k)
        .subscribe(        
          correcto => { 
            if(correcto['RetornoCorrecto']==="S")
            {
              //console.log(correcto);        
              swal(
                'Tarea Eliminada',
                '',
                'success'
              );

              //recargo las tareas
              this.tareas = null;
              this.listarTareasDeProyecto();
              //console.log(this.tareas);
            }
            else{
              this.status = 'error';
              //console.log(correcto);              
              // swal(
              //   'Error',
              //   'No se pudo borrar la tarea',
              //   'error'
              // );
              swal({
                position: "center",
                type: "error",
                title: correcto['Mensaje'],
                text: correcto['Descripcion'],
                showConfirmButton: false,
                timer: 3000
              });
      
            }
        },(error) => {
          this.status = 'error';
          //console.log(error);
          let MSG = 'No se puede eliminar la tarea.';                    
          /* swal({
            position: 'center',
            type: 'error',
            title: ''+MSG,
            showConfirmButton: true,      
          }); */
          swal(
            'Error',
            ''+error,
            'error'
          );
          } 
        )  
      }
    }

    else{

    }
  });
  

 
}

listarTareasDeProyecto(){

//OBTENGO EL PROYECTO
this.proyecto=this.pservice.getProyecto(this.id);

//almaceno en localstorage para poder acceder desde una tarea nueva    
localStorage.setItem('proyecto',JSON.stringify(this.proyecto)); 

//OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
 this.tservice.getTareasDeProyecto(this.id)
 .subscribe(        
 correcto => { 
  if(correcto['RetornoCorrecto']==="S")
  { 
    if(correcto['Retorno'].length>=0){
      //console.log(correcto);
      this.tareas = null;
      this.tareas = correcto['Retorno'];
    }
}         
else {
this.status = "error";
swal({
  position: "center",
  type: "error",

  /*"usuario o contraseña incorrectos" */
  title: correcto['Mensaje'],
  text: correcto['Descripcion'],
  showConfirmButton: false,
  timer: 2000
});
}  
},(error) => {
  this.status = "error";
  //console.log(error);
  swal(
    'Error',
    ''+error,
    'error'
  );                 
 } 
)
}

  ngOnInit() {

    this.listarTareasDeProyecto();
  }

}
