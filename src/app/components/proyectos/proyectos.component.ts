import { ProyectosService } from "./../../services/proyectos.service";
import { Proyecto } from "./../../interfaces/proyecto";
import { Usuario } from "../../interfaces/usuario";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import swal from "sweetalert2";
import { UsuarioService } from "../../services/usuario.service";
import { Router } from "@angular/router";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
import { FormControl } from "@angular/forms";
import { debug } from "util";


//import { PaginationModule } from 'ngx-pagination-bootstrap';

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
  loading: boolean;
  p: number = 1;

  user: Usuario = {
    Nombre: "",
    Email: "",
    //password: string;
    Img: "",
    CI: ""
  };

  useraasignar: Usuario = {
    Nombre: "",
    Email: "",
    //password: string;
    Img: "",
    CI: ""
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
  listausuariosMerge:Usuario[]=[];

  valueSelected: string;

  status: string;

  

  constructor(private pservice: ProyectosService,private router: Router,
    private uservice: UsuarioService,private modalService: NgbModal) {}

    

    
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Cerrado con: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
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




  onProyectoChange() {
    //console.log(this.proyecto);

    //tomamos una lista y la filtramos por un elemento del objeto dentro de la lista (Lambda Expression )
    let proyecto = this.proyectos.find(p => p.IdProyecto == this.proyecto.IdProyecto)

    this.uservice.getUsuariosAsignadosAProyecto(proyecto).subscribe(
      correcto => {

        if (correcto['RetornoCorrecto'] === "S") {

          if (correcto['Retorno'].length >= 0) {
            //vacio las tareas y las vuelvo a cargar.

            this.listausuariosMerge = null;


            // this.listausuarios = correcto['Retorno'];

            //selecciono la primer tarea de la lista del proyecto cargado
            this.listausuariosMerge = correcto['Retorno'];           
            
            this.valueSelected = this.selectedusers.value && this.selectedusers.value.toString();

            

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










  ngOnInit() {      
    
    //LLAMO AL SERVICIO Y OBTENGO TODOS LOS USUARIOS
    this.uservice.getUsuarios().subscribe(
          correcto => {
            
            if(correcto['RetornoCorrecto']==="S")
                { 
                  if(correcto['Retorno'].length>0){
                    //console.log(correcto);
                    this.listausuarios = correcto['Retorno'];  
                    //console.log(this.listausuarios);                  
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


