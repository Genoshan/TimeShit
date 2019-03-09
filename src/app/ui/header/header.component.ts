import { Component, OnInit,DoCheck  } from '@angular/core';
import { Usuario } from "../../interfaces/usuario";
//import { Router } from "../../../../node_modules/@angular/router";
import {Router,RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck{

  user1: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0
  };
  correcto = false;

  
  constructor(private router: Router) {
    this.user1 = JSON.parse(localStorage.getItem("usuario"));

    if (this.user1 == null) {
      this.correcto = false;
    } else{
      this.correcto = true;      
    } 
    
  }

  logout() {
    this.router.navigate([""]);
    localStorage.removeItem("usuario");
    this.user1 = null;    
    //this.auth.logout();
  }

  ngDoCheck() {
    
    if(JSON.parse(localStorage.getItem("usuario"))==null) {      
    }
    else{      
      this.user1 = JSON.parse(localStorage.getItem("usuario"));      
    }

 }

  ngOnInit() {
    
  }

}
