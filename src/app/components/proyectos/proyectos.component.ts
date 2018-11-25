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
  itemsPerPage: number = 9;

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
    codigoProyecto: "",
    IdProyecto: 0
  };

  status: string;

  constructor(private pservice: ProyectosService,
    private uservice: UsuarioService) {}



  buscar(termino: string) {
    this.loading = true;
    this.proyectos = this.pservice.getProyectoxTermino(termino);
  }

  asignarUsuarios(){    
    //tengo un usuario   
    //tengo un proyecto
    //llamo al servicio y le paso usuario y proyecto

    this.uservice.asignarUsuarios(this.proyecto,this.useraasignar).subscribe(
      correcto => {
        if (correcto) {
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
               title: "Error al asignar",             
               text: "usuario o contraseña incorrectos",
               showConfirmButton: false,
               timer: 1750
             });
      }})
    
    
  }

  ngOnInit() {

    //LISTA PROYECTOS DEL USUARIO DESDE API
    this.user = JSON.parse(localStorage.getItem("usuario"));

    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO
    this.pservice.getProyectosUsuario(this.user["CI"]).subscribe(
      correcto => {
        if (correcto) {
          this.proyectos = correcto;
          //Para que cargue el primer elemento del combo
          this.proyecto = this.proyectos[0];
        } else {
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(error);
        swal(
          'Error',
          ''+error,
          'error'
        );
      }
    );
  }
}
