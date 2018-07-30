import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router: Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    //Para el AuthGuard:
    //convertimos  un objeto que no es boolean mediante map a un Observable de tipo boolean. Si no da error el canActivate porque 
    //devuelve Booleans. Si existe el usuario devolvemos true
    /*return this.auth.user$.map( user => {
      if (user) return true;      
      //else navegamos hacia la pagina login y devolvemos false.

      this.router.navigate(['/login-usuario'], { queryParams: { returnUrl: state.url}});
      return false;
    });*/
    console.log('dummy guard clause for User search');
    return true;
  }
}
