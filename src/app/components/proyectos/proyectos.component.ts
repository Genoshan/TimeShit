// import { ProyectosService } from "./../../services/proyectos.service";
// import { Proyecto } from "./../../interfaces/proyecto";
// import { Usuario } from "../../interfaces/usuario";
// import { Component, OnInit } from "@angular/core";
// import { NgxPaginationModule } from "ngx-pagination";
// import swal from "sweetalert2";
// import { UsuarioService } from "../../services/usuario.service";
// //import { PaginationModule } from 'ngx-pagination-bootstrap';

// declare var require: any;
// const Swal = require('sweetalert2');
// @Component({
//   selector: "app-proyectos",
//   templateUrl: "./proyectos.component.html",
//   styleUrls: ['./proyectos.component.css']
// })
// export class ProyectosComponent implements OnInit {

//   result: any[];



//   proyectos: Proyecto[] = [];
//   loading: boolean;
//   p: number = 1;
//   itemsPerPage: number = 9;

//   user: Usuario = {
//     Nombre: "",
//     email: "",
//     //password: string;
//     img: "",
//     ci: ""
//   };

//   useraasignar: Usuario = {
//     Nombre: "",
//     email: "",
//     //password: string;
//     img: "",
//     ci: ""
//   };

//   proyecto: Proyecto = {
//     Nombre: "",
//     FechaInicio: new Date(Date.now()),
//     Estado: true,
//     CodigoProyecto: "",
//     IdProyecto: 0
//   };

//   status: string;

//   constructor(private pservice: ProyectosService,
//     private uservice: UsuarioService) {}



//   buscar(termino: string) {
//     this.loading = true;
//     this.proyectos = this.pservice.getProyectoxTermino(termino);
//   }

//   asignarUsuarios(){    
//     //tengo un usuario   
//     //tengo un proyecto
//     //llamo al servicio y le paso usuario y proyecto

//     this.uservice.asignarUsuarios(this.proyecto,this.useraasignar).subscribe(
//       correcto => {
//         if (correcto) {
//           //console.log(JSON.parse(localStorage.getItem("usuario")));
//           swal({
//                position: "center",
//                type: "success",
//                title: `Usuario asignado!`,
//                showConfirmButton: false,
//                timer: 2000
//              });             
//            } else {
//              this.status = "error";
//              swal({
//                position: "center",
//                type: "error",
//                title: "Error al asignar",             
//                text: "usuario o contraseña incorrectos",
//                showConfirmButton: false,
//                timer: 1750
//              });
//       }})
    
    
//   }

//   ngOnInit() {

//     //LISTA PROYECTOS DEL USUARIO DESDE API
//     this.user = JSON.parse(localStorage.getItem("usuario"));

//     //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO
//     this.pservice.getProyectosUsuario(this.user["CI"]).subscribe(
//       correcto => {
//         if (correcto) {
//           this.proyectos = correcto;
//           //Para que cargue el primer elemento del combo
//           this.proyecto = this.proyectos[0];
//         } else {
//           this.status = "error";
//         }
//       },
//       error => {
//         this.status = "error";
//         console.log(error);
//         swal(
//           'Error',
//           ''+error,
//           'error'
//         );
//       }
//     );
//   }
// }


import { ProyectosService } from "./../../services/proyectos.service";
import { Proyecto } from "./../../interfaces/proyecto";
import { Usuario } from "../../interfaces/usuario";
import { Component, OnInit } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import swal from "sweetalert2";
import { UsuarioService } from "../../services/usuario.service";
//import { PaginationModule } from 'ngx-pagination-bootstrap';

declare var require: any;
const Swal = require('sweetalert2');
@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  result: any[];

  proyectos: Proyecto[] = [];
  loading: boolean;
  p: number = 1;

  user: Usuario = {
    Nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  };

  useraasignar: Usuario = {
    Nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  };

  proyecto: Proyecto = {
    Nombre: "",
    FechaInicio: new Date(Date.now()),
    Estado: true,
    CodigoProyecto: "",
    IdProyecto: 0
  };

  status: string;

  constructor(private pservice: ProyectosService,
    private uservice: UsuarioService) {}

  buscar(termino: string) {
    this.loading = true;
    this.proyectos = this.pservice.getProyectoxTermino(termino);
  }

  borrarProyecto(k: Number) {  

    //console.log('antesdelswal');
    swal({
      title: 'El proyecto se eliminará, está seguro?',
      text: "El proyecto no se podrá recuperar.",
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
          this.pservice.eliminarProyecto(k)
          .subscribe(        
            correcto => { 
              if(correcto['RetornoCorrecto']==="S")
              {
                //console.log(correcto);        
                swal(
                  'Proyecto Eliminado',
                  '',
                  'success'
                );
  
                //recargo las tareas
                this.proyectos = null;
                //this.listarTareasDeProyecto();
                //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO
    this.pservice.getProyectosUsuario(this.user["CI"]).subscribe(
      correcto => {
        if(correcto['RetornoCorrecto']==="S")
            { 
              if(correcto['Retorno'].length>0){
                //console.log(correcto);
                this.proyectos = correcto['Retorno'];                      
              }
        // if (correcto) {
        //   this.proyectos = correcto;
        //   //Para que cargue el primer elemento del combo
        //   //this.proyecto = this.proyectos[0];
        }         
        else {
          this.status = "error";
          swal({
            position: "center",
            type: "error",
            title: correcto['Mensaje']/*"usuario o contraseña incorrectos" */,             
            text: correcto['Descripcion'],
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      error => {
        this.status = "error";
        //console.log(error);
        swal(
          'Error',
          ''+error,
          'error'
        );
      }
    ); 
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
            let MSG = 'No se puede eliminar el proyecto.';                    
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

  asignarUsuarios(){    
    //tengo un usuario   
    //tengo un proyecto
    //llamo al servicio y le paso usuario y proyecto

    this.uservice.asignarUsuarios(this.proyecto,this.useraasignar).subscribe(
      correcto => {
        if (correcto==="S") {
          //console.log(JSON.parse(localStorage.getItem("usuario")));
          swal({
               position: "center",
               type: "success",
               title: `Usuario asignado!`,
               showConfirmButton: false,
               timer: 2000
             });             
           } else {
             this.status = "error";
             swal({
               position: "center",
               type: "error",
               title: correcto.Mensaje,             
               text: correcto.Descripcion,
               showConfirmButton: false,
               timer: 2000
             });
      }})
  }

  ngOnInit() {

    //LISTA PROYECTOS DEL USUARIO DESDE API
    this.user = JSON.parse(localStorage.getItem("usuario"));

    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO
    this.pservice.getProyectosUsuario(this.user["CI"]).subscribe(
      correcto => {
        
        if(correcto['RetornoCorrecto']==="S")
            { 
              if(correcto['Retorno'].length>0){
                //console.log(correcto);
                this.proyectos = correcto['Retorno'];                      
              }
        }         
        else {
          this.status = "error";
          swal({
            position: "center",
            type: "error",

            //"usuario o contraseña incorrectos"
            title: correcto['Mensaje'],             
            text: correcto['Descripcion'],
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
          error => {
        this.status = "error";
        //console.log(error);
        swal(
          'Error',
          ''+error,
          'error'
        );
      }
    );
  }
}


