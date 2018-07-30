import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { isNull } from 'util';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  
  user1:Usuario={
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }
  correcto = false;

  constructor(/*public auth:AuthService*/private router: Router) {

    this.user1 = JSON.parse(localStorage.getItem('usuario'));    
    console.log(this.user1);

    if (this.user1== null ){
      this.correcto = false;      
    }
    else this.correcto=true;

    console.log(this.correcto);
   }

   toggleCollapse() {
    
  }

  logout() {
        
    this.router.navigate(['']); 
    localStorage.removeItem('usuario');
    this.user1 = null;
    console.log('llegaaca');
    //this.auth.logout();
  }


}
