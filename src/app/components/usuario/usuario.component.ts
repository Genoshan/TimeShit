import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

import swal from "sweetalert2";
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { Compania } from 'src/app/interfaces/compania';

declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  /*****ATRIBUTOS******/

  

  nuevo: boolean = false;

  email: string;

  user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany : 0
  };

  company: Compania;

  status: string;

  constructor(private us: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location) {
      this.activatedRoute.params.subscribe(parametros => {
        this.email = parametros["Email"];
      });    
     }

     //Ir Atras
  backClicked() {
    this._location.back();
}

getUsuario() {
  if (this.email == "nueva") {
    //console.log(this.proyecto);
    //this.tarea.IdProyecto = this.proyecto.IdProyecto;   

    //this.user.oCompany=this.company.IdCompania;
  } else {    
    this.user = this.us.getUsuario(this.email);    
    
    //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
    // traer el get company
    
  }
}


altaUsuario() {
  if (this.email == "nueva") {
    // insertando    

    this.us.altaUsuario(this.user).subscribe(
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
            title: "Usuario agregado Correctamente"
          });
          this.router.navigate([`/usuarios`]);
          this.user = correcto['Retorno'];
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
        swal(
          'Error',
          ''+error,
          'error'
        );
      }
    );
  } else {
    //actualizando   

    this.us.editarUsuario(this.user).subscribe(
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
            title: "Usuario Modificado Correctamente"
          });
          this.router.navigate([`/tareas/${this.user.Email}`]);
          this.user = correcto['Retorno'];
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


    

  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem("usuario"));    
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA
    this.getUsuario();    
  }

}
