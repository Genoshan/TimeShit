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
  fecha: any;

  total: number = 0;

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
    CodigoProyecto: "",
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

  
  toggleSection(i) {
    this.result[i].open = !this.result[i].open;
  }


  ngOnInit() {
    //LISTA HORAS EFECTIVAS DEL USUARIO DESDE API
    this.user = JSON.parse(localStorage.getItem("usuario"));

    this.hservice.ListarHorasMensualesDeUsuario(this.user["CI"]).subscribe(
      correcto => {
        if(correcto.RetornoCorrecto==="S")
        {
        if (correcto.Retorno.length>0) 
        {
          //obtengo las horas efectivas
          this.horasefectivas = correcto.Retorno;
          //Agrupo Por Fecha y retorno una coleccion ordenada de Fecha, HorasEfectivas y Total de Hs 
          var Fechas = new Set(this.horasefectivas.map(item => item.oHora.Fecha))
          this.result = [];
          //console.log(Fechas);
          Fechas.forEach(f =>
            this.result.push({
              name: f,
              values: this.horasefectivas.filter(i => i.oHora.Fecha === f),
              total: this.horasefectivas.filter(i => i.oHora.Fecha === f)
                .reduce(function (acc, obj) { return acc + obj.oHora.CantidadHoras; }, 0)

            }
            ))

        }         
      }
    else
    {
      swal({
        position: "center",
        type: "error",
        title: correcto.Mensaje,             
        text: correcto.Descripcion,
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
          '' + error,
          'error'
        );
      }
    );
  }
}










