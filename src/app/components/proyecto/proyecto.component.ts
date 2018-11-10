import { ProyectosService } from "../../services/proyectos.service";
import { Component, OnInit } from "@angular/core";
import { NgDatepickerModule } from "ng2-datepicker";
import { Proyecto } from "./../../interfaces/proyecto";
import { DatepickerOptions } from "ng2-datepicker";
import * as frLocale from "date-fns/locale/fr";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../interfaces/usuario";
import swal from "sweetalert2";
import {Location} from '@angular/common';

declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-proyecto",
  templateUrl: "./proyecto.component.html",
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: "MMM D[,] YYYY",
    barTitleFormat: "MMMM YYYY",
    dayNamesFormat: "dd",
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()), // Maximal selectable date
    barTitleIfEmpty: "Click to select a date"
  };

  /*****ATRIBUTOS******/

  nuevo: boolean = false;
  id: string;
  proyectos: Proyecto[] = []; 

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
    private pr: ProyectosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros["id"];
    });

    this.options = new NgDatepickerModule();
  }

//Ir Atras
  backClicked() {
    this._location.back();
}

  /*****OPERACIONES*****/

  getProyecto() {
    if (this.id == "nuevo") {
      
    } else {
      this.proyecto = this.pr.getProyecto(Number(this.id));      
    }
  }

  crearProyectos() {
    if (this.id == "nuevo") {
      // insertando

      this.pr.crearProyectos(this.proyecto).subscribe(
        correcto => {
          if (correcto.RetornoCorrecto==="S") {
            const toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            toast({
              type: "success",
              title: "Proyecto creado Correctamente"
            });
            this.router.navigate([`/proyectos`]);
            this.proyecto = correcto.Retorno;
          } 
          else {            
            this.status = "error";
            swal({
              position: "center",
              type: "error",
              title: correcto.Mensaje,             
              text: correcto.Descripcion,
              showConfirmButton: false,
              timer: 3000
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

      this.pr.editarProyecto(this.proyecto).subscribe(
        correcto => {
          if (correcto.RetornoCorrecto==="S") {
            const toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            toast({
              type: "success",
              title: "Proyecto modificado Correctamente"
            });
            this.router.navigate([`/proyectos/`]);
            this.proyecto = correcto.Retorno;
          } else {
            //this.status = "error";
            this.status = "error";
            swal({
              position: "center",
              type: "error",
              title: correcto.Mensaje,             
              text: correcto.Descripcion,
              showConfirmButton: false,
              timer: 3000
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
    //this.proyecto = JSON.parse(localStorage.getItem("proyecto"));
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA
    this.getProyecto();
    //this.proyectos.push(this.proyecto);
  }
}
