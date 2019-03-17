import { ProyectosService } from "./../../services/proyectos.service";
import { Proyecto } from "./../../interfaces/proyecto";
import { Usuario } from "../../interfaces/usuario";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import swal from "sweetalert2";
import { UsuarioService } from "../../services/usuario.service";
import { Router } from "@angular/router";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatSelectionList, MatSelectionListChange, MatListOption,MatCheckboxModule } from '@angular/material';
import { FormControl } from "@angular/forms";
import { debug } from "util";
import { forEach } from "@angular/router/src/utils/collection";


declare var require: any;
const Swal = require('sweetalert2');
@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ['./proyectos.component.css']
})





export class ProyectosComponent implements OnInit {

  selectedusers = new FormControl();

  closeResult: string;

  result: any[];
  selected: any;

  proyectos: Proyecto[] = [];
  proyectosModal: Proyecto[] = [];
  loading: boolean;
  p: number = 1;

  user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };

  usuariologueado: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };

  useraasignar: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };

  proyecto: Proyecto = {
    Nombre: "",
    FechaInicio: new Date(Date.now()),
    Estado: true,
    CodigoProyecto: "",
    IdProyecto: 0
  };

  listausuariosaasignar:Usuario[]=[];
  listausuarios:Usuario[]=[];
  listamarcados:Usuario[]=[];
  listausuariosMerge:Usuario[]=[];
  listausuariosAMostrar:Usuario[]=[];


  valueSelected: string;

  status: string;

  selectedOptions=[];
  selectedOption;

  

  constructor(private pservice: ProyectosService,private router: Router,
    private uservice: UsuarioService,private modalService: NgbModal) {}
    //Selecciona los usuarios asignados en el combo
    compareWithFunc(a, b) {
      return a.Email === b.Email;
    }

    
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Cerrado con: ${result}`;
      }, (reason) => {
        this.closeResult = `Desestimado ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'Con ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'Click en atras';
      } else {
        return  `con: ${reason}`;
      }
    }

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
          this.pservice.eliminarProyecto(k, this.user)
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

    console.log(this.proyecto);
    console.log(this.useraasignar);

    this.uservice.asignarUsuarios(this.proyecto,this.listausuariosAMostrar, this.usuariologueado).subscribe(
      correcto => {
        if (correcto==="S") {
          //console.log(JSON.parse(localStorage.getItem("usuario")));
          swal({
               position: "center",
               type: "success",
               title: `Usuarios asignado!`,
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




  onProyectoChange() {    

    //tomamos una lista y la filtramos por un elemento del objeto dentro de la lista (Lambda Expression )

    let proyecto = this.proyectosModal.find(p => p.IdProyecto == this.proyecto.IdProyecto)

    this.uservice.getUsuariosAsignadosAProyecto(proyecto).subscribe(
      correcto => {

        if (correcto['RetornoCorrecto'] === "S") {

          if (correcto['Retorno'].length >= 0) {
            //vacio las tareas y las vuelvo a cargar.

            this.listausuariosMerge = null;
            this.listamarcados = null;

            // this.listausuarios = correcto['Retorno'];

            //selecciono la primer tarea de la lista del proyecto cargado
            this.listausuariosMerge = correcto['Retorno'];                 
            this.listamarcados =  this.listausuariosMerge;
            //this.useraasignar = this.listausuariosMerge;  
            
            this.listausuariosAMostrar = this.listausuariosMerge;

            // this.listausuarios.forEach(u => {               
            //   this.useraasignar = this.listausuariosMerge.find(x => x.Email === u.Email);              
            //   });

            
            //console.log(this.listausuariosAMostrar);            
            //this.valueSelected = this.selectedusers.value && this.selectedusers.value.toString(); 
            //console.log(this.valueSelected);           

          }
        }
        else {
          this.status = 'error';
          swal({
            position: "center",
            type: "error",
            title: correcto['Mensaje'],
            text: correcto['Descripcion'],
            showConfirmButton: false,
            timer: 2000
          });
        }
      }, (error) => {
        this.status = "error";
        //console.log(error);
        swal(
          'Error',
          '' + error,
          'error'
        );
      })

    //OBTENGO LA TAREA
    //this.hora.IdTarea = this.tarea.IdTarea;
    //this.tarea.IdProyecto = this.proyecto.IdProyecto;
  }

  onNgModelChange($event){
    
    this.listausuariosAMostrar=$event;
    console.log(this.listausuariosAMostrar);
    // this.selectedOption=$event.Nombre;    
  }








  ngOnInit() {

    //OBTENGO TODOS LOS PROYECTOS PARA EL MODAL
    
    this.pservice.getProyectos().subscribe(
      correcto => {
        
        if(correcto['RetornoCorrecto']==="S")
            { 
              if(correcto['Retorno'].length>0){                
                this.proyectosModal = correcto['Retorno'];                  
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
    
    //LLAMO AL SERVICIO Y OBTENGO TODOS LOS USUARIOS

    this.uservice.getUsuarios().subscribe(
          correcto => {
            
            if(correcto['RetornoCorrecto']==="S")
                { 
                  if(correcto['Retorno'].length>0){                    
                    this.listausuarios = correcto['Retorno'];                      
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
    



    //LISTA PROYECTOS DEL USUARIO DESDE API para LA GRILLA
    this.user = JSON.parse(localStorage.getItem("usuario"));


    //OBTENGO LOS USUARIOS:

    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO
    this.pservice.getProyectosUsuario(this.user["Email"]).subscribe(
      correcto => {
        
        if(correcto['RetornoCorrecto']==="S")
            { 
              if(correcto['Retorno'].length>0){
                //console.log(correcto);
                this.proyectos = correcto['Retorno'];

                //esto es para asignar usuarios a proyectos y asignar el valor inicial del combo
                //this.proyecto = this.proyectos[0];
                //this.onProyectoChange();

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

    //PARA CARGAR MODAL ASIGNAR USUARIOS A PROYECTOS

  }
}


