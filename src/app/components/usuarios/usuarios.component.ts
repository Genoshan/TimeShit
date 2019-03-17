import { Component, OnInit } from '@angular/core';

import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from 'src/app/interfaces/usuario';

import swal from "sweetalert2";

import {Location} from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private uservice: UsuarioService, private _location: Location, private router:Router, ) { }

  //Ir Atras
backClicked() {
  this._location.back();
}

AtrasPadre() {  
  this.router.navigateByUrl(localStorage.getItem("RutaProyecto"));  
}

GuardarPadre(){
  localStorage.setItem("RutaUsuario",this.router.url);
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
