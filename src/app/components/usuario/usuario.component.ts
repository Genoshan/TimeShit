import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

import swal from "sweetalert2";
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { Compania } from 'src/app/interfaces/compania';
import { HeaderComponent } from '../../ui/header/header.component';

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
    oCompany : 0,
    Administrador: false
  };
usuariologueado: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany : 0,
    Administrador: false
  };
  company: Compania;
  companias:Compania[] = [];

  status: string;

  hayerrores: boolean = false;

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
    
    this.us.altaUsuario(this.usuariologueado , this.user).subscribe(
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
          this.hayerrores = true;   
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
    //this.usuariologueado = JSON.parse(localStorage.getItem("usuario"));
    this.us.editarUsuario(this.usuariologueado , this.user).subscribe(
      correcto => {
        if(correcto==="S") {
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
          if (this.usuariologueado.Email == this.user.Email) {
            localStorage.clear();
            this.router.navigate([""]);            
            window.location.reload();
          }
          else
          {            
            this.router.navigate([`/usuarios`]);
            this.user = correcto['Retorno'];
          }
          
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
        swal(
          'Error',
          ''+error,
          'error'
        );
      }
    );
  }
}


listarCompania(){
  
  //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
   this.us.getCompania()
   .subscribe(        
   correcto => {         
    if(correcto['RetornoCorrecto']==="S")
    { 
      if(correcto['Retorno'].length>=0){      
        this.companias = null;
        this.companias = correcto['Retorno'];
      }
  }         
  else {    
  
    if(correcto===false){
      
      this.hayerrores = true;
  
      swal({
        position: "center",
        type: "info",
        title: "Aviso",
        text: "No existen companias",
        showConfirmButton: false,
        timer: 3000
      });
    }
  
    else{
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
  }  
  },(error) => {
    this.status = "error";  
    swal(
      'Error',
      ''+error,
      'error'
    );                 
   } 
  )
  }

    

  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem("usuario"));    
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA
    this.getUsuario();    
    this.listarCompania();
    this.usuariologueado = JSON.parse(localStorage.getItem("usuario"));
  }

}
