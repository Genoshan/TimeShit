import { TareasService } from "./../../services/tareas.service";
import { ProyectosService } from "../../services/proyectos.service";
import { Component, OnInit } from "@angular/core";
import { Tarea } from "../../interfaces/tarea";
import { Proyecto } from "./../../interfaces/proyecto";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../interfaces/usuario";
import swal from "sweetalert2";

import {Location} from '@angular/common';

declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-tarea",
  templateUrl: "./tarea.component.html",
  styles: []
})
export class TareaComponent implements OnInit {


  /*****ATRIBUTOS******/

  nuevo: boolean = false;
  id: string;
  proyectos: Proyecto[] = [];

  tarea: Tarea = {
    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio: new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0
  };

  user: Usuario = {
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

  /********CONSTRUCTOR******/

  constructor(
    private ts: TareasService,
    private pr: ProyectosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros["id"];
    });    
  }

//Ir Atras
  backClicked() {
    this._location.back();
}

  /*****OPERACIONES*****/

  getTarea() {
    if (this.id == "nueva") {
      //console.log(this.proyecto);
      this.tarea.IdProyecto = this.proyecto.IdProyecto;
    } else {
      this.tarea = this.ts.getTarea(Number(this.id));
      //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
      this.proyecto = this.pr.getProyecto(this.tarea.IdProyecto);
    }
  }

  crearTareas() {
    if (this.id == "nueva") {
      // insertando

      this.ts.crearTareas(this.tarea).subscribe(
        correcto => {
          if(correcto['RetornoCorrecto']==="S") {
            const toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            toast({
              type: "success",
              title: "Tarea creada Correctamente"
            });
            this.router.navigate([`/tareas/${this.proyecto.IdProyecto}`]);
            this.tarea = correcto['Retorno'];
          } 
          else {            
            this.status = "error";
            swal({
              position: "center",
              type: "error",
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
    } else {
      //actualizando

      this.ts.editarTarea(this.tarea).subscribe(
        correcto => {
          if(correcto['RetornoCorrecto']==="S") {
            const toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            toast({
              type: "success",
              title: "Tarea modificada Correctamente"
            });
            this.router.navigate([`/tareas/${this.proyecto.IdProyecto}`]);
            this.tarea = correcto['Retorno'];
          } else {
            //this.status = "error";
            this.status = "error";
            swal({
              position: "center",
              type: "error",
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

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("usuario"));
    this.proyecto = JSON.parse(localStorage.getItem("proyecto"));
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA
    this.getTarea();
    this.proyectos.push(this.proyecto);
  }
}
