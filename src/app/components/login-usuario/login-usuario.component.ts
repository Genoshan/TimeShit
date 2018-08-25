import { UsuarioService } from "./../../services/usuario.service";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/usuario";
import { NgForm, FormGroup, FormControl, Validators, NgControl } from "@angular/forms";
import { Router } from "@angular/router";

import swal from "sweetalert2";

@Component({
  selector: "app-login-usuario",
  templateUrl: "./login-usuario.component.html",
  styleUrls: ["./login-usuario.component.css"]
})
export class LoginUsuarioComponent implements OnInit {
  user: Usuario = {
    Nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
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
        if (correcto) {
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
            title: "usuario o contraseña incorrectos",
            showConfirmButton: false,
            timer: 1000
          });
          //alert('El usuario no esta');
        }
      },
      error => {
        this.status = "exception";
        swal({
          position: "center",
          type: "error",
          title: "Error de Servidor",
          showConfirmButton: false,
          timer: 1000
        });
      }
    );
  }
}
