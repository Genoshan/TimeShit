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
import { Usuario } from 'src/app/interfaces/usuario';


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

  user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };
  status: string;
  hayerrores: boolean=false;

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

AtrasPadre() {  
  this.router.navigateByUrl(localStorage.getItem("RutaProyecto"));  
}

GuardarPadre(){
  localStorage.setItem("RutaTarea",this.router.url);
}

buscar(termino: string) {
  this.loading = true;
  this.tareas=this.tservice.getTareasxTermino(termino);
  
}

borrarTarea(k: Number) {  
  
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
        this.tservice.eliminarTarea(k, this.user)
        .subscribe(        
          correcto => {                
            if(correcto==="S")
            {              
              swal(
                'Tarea Eliminada',
                '',
                'success'
              );

              //recargo las tareas
              this.tareas = null;              
              this.listarTareasDeProyecto();              
            }
            else{
              this.status = 'error';
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
          let MSG = 'No se puede eliminar la tarea.';                    
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
      this.tareas = null;
      this.tareas = correcto['Retorno'];
    }
}         
else {

  if(correcto===false){
    
    this.hayerrores = true;

    swal({
      position: "center",
      type: "info",
      title: "Aviso",
      text: "No existen tareas para el proyecto",
      showConfirmButton: false,
      timer: 3000
    });
  }

  else{
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
}  
},(error) => {
  this.status = "error";  
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
    this.user = JSON.parse(localStorage.getItem("usuario"));
    //console.log(this.router.url);
    
  }

}
