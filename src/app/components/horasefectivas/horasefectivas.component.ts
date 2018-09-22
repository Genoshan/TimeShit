import { Horaefectiva } from './../../interfaces/horaefectiva';
import { ProyectosService } from "./../../services/proyectos.service";
import { Proyecto } from "./../../interfaces/proyecto";
import { Usuario } from "../../interfaces/usuario";
import { Component, OnInit } from '@angular/core';
import { HorasService } from "../../services/horas.service";
import swal from "sweetalert2";
import { Hora } from "../../interfaces/hora";

import { Location } from '@angular/common';
import { Tarea } from "../../interfaces/tarea";



@Component({
  selector: 'app-horasefectivas',
  templateUrl: './horasefectivas.component.html',
  styleUrls: ['./horasefectivas.component.css']
})
export class HorasefectivasComponent implements OnInit {

  proyectos: Proyecto[] = [];
  result: any[];
  name = Date;
  fecha : any;

  prueba :any;

  horasefectivas: Horaefectiva[] = [];

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

  tarea: Tarea = {
    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio: new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0
  }

  hora: Hora = {
    Idhora: 0,
    Descripcion: "",
    CantidadHoras: 0,
    Fecha: new Date(Date.now()),
    IdTarea: 0,
  };

  status: string;

  constructor(private pservice: ProyectosService,
    private hservice: HorasService,
    private _location: Location) { }

  buscar(termino: string) {
    this.loading = true;
    this.proyectos = this.pservice.getProyectoxTermino(termino);
  }

  //Ir Atras
  backClicked() {
    this._location.back();
  }
ngOnInit() {
  //LISTA HORAS EFECTIVAS DEL USUARIO DESDE API
  this.user = JSON.parse(localStorage.getItem("usuario"));

  this.hservice.ListarHorasMensualesDeUsuario(this.user["CI"]).subscribe(
    correcto => {
      if (correcto) {
        this.horasefectivas = correcto;

        var Fechas = new Set(this.horasefectivas.map(item => item.oHora.Fecha))
          this.result = [];
          console.log(Fechas);
        Fechas.forEach(f =>                    
          this.result.push({
            name: f,
            values: this.horasefectivas.filter(i => i.oHora.Fecha === f)       
          }

          ),console.log(this.result)),      
          console.log(Fechas);
        console.log(this.horasefectivas);

      } else {
        this.status = "error";
      }
    },
    error => {
      this.status = "error";
      console.log(error);
      swal(
        'Error',
        '' + error,
        'error'
      );
    }
  );
}
}










