import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  user:Usuario={
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }

  email:string;
  pass:string;  
  public identity;


  constructor(private router: Router, private pservice: UsuarioService) {    
   }

  ngOnInit() {
    //console.log(this.usuario);      
  }

  onSubmit(loginForm: NgForm){

    //Logueo usuario y conseguir el objeto
    
    this.pservice.login(loginForm.value.email,loginForm.value.pass)
      .subscribe(
      correcto => this.router.navigate(['/proyectos']));
    //console.log(this.usuario);      
  }



}
