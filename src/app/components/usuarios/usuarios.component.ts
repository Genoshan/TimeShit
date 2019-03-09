import { Component, OnInit } from '@angular/core';

import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from 'src/app/interfaces/usuario';

import swal from "sweetalert2";

import {Location} from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];

  listausuarios:Usuario[]=[];

  loading:boolean;
  status: string;

  constructor(private uservice: UsuarioService, private _location: Location ) { }

  //Ir Atras
backClicked() {
  this._location.back();
}

buscar(termino: string) {
  this.loading = true;
  this.listausuarios=this.uservice.getUsuariosxTermino(termino);
  
}

  ngOnInit() {

    this.uservice.getUsuarios().subscribe(
      correcto => {
        
        if(correcto['RetornoCorrecto']==="S")
            { 
              if(correcto['Retorno'].length>0){
                //console.log(correcto);
                this.listausuarios = correcto['Retorno'];                  
                localStorage.setItem('usuarios',JSON.stringify(this.listausuarios)); 
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


  }

}
