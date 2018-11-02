import { Component, OnInit } from '@angular/core';
import { Hora } from '../../../interfaces/hora';
import { Proyecto } from '../../../interfaces/proyecto';
import { Tarea } from '../../../interfaces/tarea';
import { TareasService } from '../../../services/tareas.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HorasService } from '../../../services/horas.service';
import swal from 'sweetalert2';

import {Location} from '@angular/common';

@Component({
  selector: 'app-listarhoras',
  templateUrl: './listarhoras.component.html',
  styleUrls: ['./listarhoras.component.css']
})
export class ListarhorasComponent implements OnInit {

  horas:Hora[] = [];
  p: number = 1;
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

  constructor(private tservice: TareasService,private pservice: ProyectosService, private hservice: HorasService,
    private router:Router,
    private route: ActivatedRoute,
    private _location: Location) {
      this.route.params
      .subscribe( parametros =>{
        this.id = parametros['id']            
  });

  }


  //OPERACIONES

    //Ir Atras
backClicked() {
  this._location.back();
}



  buscar(termino: string) {
    this.loading = true;
    this.horas=this.hservice.getHorasxTermino(termino);    
  }

  borrarHora(k: Number) {
    this.loading = true;
    swal({
      title: 'La hora cargada se eliminará, está seguro?',
      text: "La hora no se podrá recuperar.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        {
          //Llamo al metodo
          this.hservice.eliminarHora(k)
            .subscribe(
              correcto => {
                if (correcto.RetornoCorrecto==="S") {
                  //console.log(correcto);
                  swal(
                    'Hora Eliminada',
                    '',
                    'success'
                  );
                  //recargo las horas
                  this.horas = null;
                  this.listarHorasdeTarea();
                }
                else {
                  this.status = 'error';
                  // swal(
                  //   'Error',
                  //   'No se pudo borrar la hora',
                  //   'error'
                  // );
                  swal({
                    position: "center",
                    type: "error",
                    title: correcto.Mensaje,             
                    text: correcto.Descripcion,
                    showConfirmButton: false,
                    timer: 3000
                  });
                }
              }, (error) => {
                this.status = "error";
                //console.log(error);
                let MSG = 'No se puede eliminar la hora.';
                swal(
                  'Error',
                  '' + error,
                  'error'
                );
              }
            )

        }
      }
    });
  }

  listarHorasdeTarea(){

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS      
    this.tarea = this.tservice.getTarea(this.id);      

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('tarea',JSON.stringify(this.tarea));          

         this.hservice.getHorasDeTarea(this.tarea)
         .subscribe(        
         correcto => { 
           if(correcto.RetornoCorrecto==="S")
           {
            if(correcto.Retorno.length>=0){
              console.log(correcto);
              this.horas = null;
              this.horas = correcto.Retorno;                      
            }   
           }
           else{
             this.status = 'error';
             console.log(correcto);
             swal({
              position: "center",
              type: "error",
              title: correcto.Mensaje/*"usuario o contraseña incorrectos" */,             
              text: correcto.Descripcion,
              showConfirmButton: false,
              timer: 3000
            });                         
           }
       },(error) => {
        this.status = "error";        
        console.log(error);
        swal(
          'Error',
          ''+error,
          'error'
        );                    
         } 
       )


  }

  ngOnInit() {

    //se realizó refactory de cargar la lista de horas en un metodo independiente que se pueda llamar 
    //desde cualquier parte del codigo de la clase.
    this.listarHorasdeTarea();
  }

}
