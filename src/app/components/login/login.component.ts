
//Nueva API

import { UsuarioService } from "./../../services/usuario.service";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/usuario";
import { NgForm, FormGroup, FormControl, Validators, NgControl } from "@angular/forms";
import { Router } from "@angular/router";

import swal from "sweetalert2";

@Component({  
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };

  email: string;
  pass: string;
  public identity;
  status: string;
  loginForm: FormGroup;

  constructor(private router: Router, private pservice: UsuarioService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.compose([
          Validators.required
        ])
      ]),
      pass: new FormControl('', [
        Validators.required,
      ])
    })
  }

  onSubmit(loginForm: NgForm) {
    //Logueo usuario y conseguir el objeto

    this.pservice.login(loginForm.value.email, loginForm.value.pass).subscribe(
      correcto => {

        /*PARA USAR CON LA NUEVA FORMA DE RETORNO */
        if (correcto ==="S") {

          //console.log(JSON.parse(localStorage.getItem("usuario")));          
          swal({
            position: "center",
            type: "success",
            title: `Bienvenido : ${
              JSON.parse(localStorage.getItem("usuario"))["Nombre"]
            }`,
            showConfirmButton: false,
            timer: 2000
          });

          this.router.navigate(["/proyectos"]);         

          
        } else {
          this.status = "error";
          swal({
            position: "center",
            type: "error",
            title: correcto.Mensaje/*"usuario o contraseña incorrectos" */,             
            text: correcto.Descripcion,
            showConfirmButton: false,
            timer: 3000
          });
          
         }
      },
      error => {
        
        this.status = "exception";
        swal({
          position: "center",
          type: "error",
          title: "Error de Servidor",
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }
}
