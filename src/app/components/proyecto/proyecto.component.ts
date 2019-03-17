import { ProyectosService } from "../../services/proyectos.service";
import { Component, OnInit } from "@angular/core";
import { Proyecto } from "./../../interfaces/proyecto";
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


  /*****ATRIBUTOS******/

  nuevo: boolean = false;
  id: string;
  proyectos: Proyecto[] = []; 

  user: Usuario = {
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
      //console.log(this.user);    
      this.pr.crearProyectos(this.proyecto,this.user).subscribe(
        correcto => {
          if (correcto['RetornoCorrecto']==="S") {
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
            this.proyecto = correcto['Retorno'];

          } 
          else {            
            this.status = "error";
            swal({
              position: "center",
              type: "error",
              title: correcto['Mensaje'],             
              text: correcto['Descripcion'],
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
      console.log("Entro al Editar");
      this.pr.editarProyecto(this.proyecto, this.user).subscribe(
        correcto => {
          if (correcto['RetornoCorrecto']==="S") {
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
            this.proyecto = correcto['Retorno'];
          } else {
            //this.status = "error";
            this.status = "error";
            swal({
              position: "center",
              type: "error",
              title: correcto['Mensaje'],          
              text: correcto['Descripcion'],
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
    //this.user = JSON.parse(localStorage.getItem("usuario"));
    //{"Nombre":"Alex Rostan","Email":"alex.rostan@arkanosoft.com","Img":"","CI":"4377187-2"}
    // this.user.CI = JSON.parse(localStorage.getItem("usuario"))["CI"];
    // this.user.Email = JSON.parse(localStorage.getItem("usuario"))["Email"];
    // this.user.Img = JSON.parse(localStorage.getItem("usuario"))["Img"];
    // this.user.Nombre = JSON.parse(localStorage.getItem("usuario"))["Nombre"];
    this.user = JSON.parse(localStorage.getItem("usuario"));
    //this.usuariologueado = JSON.parse(localStorage.getItem("usuario"));

    // private Usuario: {
    //   Nombre: string;
    //   Email: string;
    //   //password: string,
    //   Img: string;
    //   CI: number;
    // };

    //this.proyecto = JSON.parse(localStorage.getItem("proyecto"));
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA
    this.getProyecto();
    //this.proyectos.push(this.proyecto);
  }
}
