import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  

  constructor(public auth:AuthService) {    
   }

   toggleCollapse() {
    
  }

  logout() {
    this.auth.logout();
  }


}
