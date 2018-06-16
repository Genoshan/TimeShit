import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  usuario:Usuario = {
    nombre: "",
    email: "",
    password: "",
    img: "",
    ci: ""
  }
  public identity;


  constructor(private pservice: UsuarioService) {    
   }

  ngOnInit() {
    console.log(this.usuario);      
  }

  onSubmit(){

    //Logueo usuario y conseguir el objeto
    this.pservice.login(this.usuario).subscribe(
      response=> {
        this.identity = response.user;

        /* VROBLES Seccion 15 Clase 79
        https://www.udemy.com/curso-de-angular-2-4-5-avanzado-mean-jwt/learn/v4/t/lecture/7689302?start=0
        
        if (!this.identity||!this.identity._id) {
          alert('El usuario no se ha logueado correctamente')
        } 
        else {

            //Conseguir objeto (token)
            this.pservice.login(this.usuario).subscribe(
              response=>{
                this.identity=response.Usuario;
                if (!this.identity||!this.identity._id) {
                  alert('El usuario no se ha logueado correctamente');
                } 
                else {
                  
                }              
              },
              
              error=>{
                console.log(<any>error);
              }
            );
        } */        

      },
      error => {
        console.log(<any>error);
      }
    );
    console.log(this.usuario);      
  }



}
