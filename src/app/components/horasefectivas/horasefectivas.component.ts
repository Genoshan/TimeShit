import { ProyectosService } from "./../../services/proyectos.service";
import { Proyecto } from "./../../interfaces/proyecto";
import { Usuario } from "../../interfaces/usuario";
import { Component, OnInit } from '@angular/core';
import { HorasService } from "../../services/horas.service";
import swal from "sweetalert2";
import { Hora } from "../../interfaces/hora";

import {Location} from '@angular/common';


@Component({
  selector: 'app-horasefectivas',
  templateUrl: './horasefectivas.component.html',
  styleUrls: ['./horasefectivas.component.css']
})
export class HorasefectivasComponent implements OnInit {

  proyectos: Proyecto[] = [];

  listahoras: HorasefectivasComponent[] = [];

  loading: boolean;
  p: number = 1;
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
    codigoProyecto: "",
    IdProyecto: 0
  };


  hora:Hora = {
    Idhora:0,
    Descripcion: "" ,
    CantidadHoras: 0,
    Fecha:new Date(Date.now()),
    IdTarea: 0,
  };

  status: string;

  constructor(private pservice: ProyectosService,
  private hservice: HorasService,
  private _location: Location) {}

  buscar(termino: string) {
    this.loading = true;
    this.proyectos = this.pservice.getProyectoxTermino(termino);
  }

  //Ir Atras
backClicked() {
  this._location.back();
}

  ngOnInit() {
    //LISTA PROYECTOS DEL USUARIO DESDE API
    this.user = JSON.parse(localStorage.getItem("usuario"));

    console.log(this.user);
    //console.log(correcto);


    this.hservice.ListarHorasMensualesDeUsuario(this.user["CI"]).subscribe(
      correcto => {
        if (correcto) {
          this.listahoras = correcto;

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

    // //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO
    // this.pservice.getProyectosUsuario(this.user["CI"]).subscribe(
    //   correcto => {
    //     if (correcto) {
    //       this.proyectos = correcto;
    //     } else {
    //       this.status = "error";
    //     }
    //   },
    //   error => {
    //     this.status = "error";
    //     console.log(error);
    //     swal(
    //       'Error',
    //       ''+error,
    //       'error'
    //     );
    //   }
    // );
  }










   }