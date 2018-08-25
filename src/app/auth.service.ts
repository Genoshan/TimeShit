import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
//import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from './interfaces/usuario';


@Injectable()
export class AuthService {
  
  user1$:Usuario={
    Nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }
  
  //user$: Observable <firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    //this.user$ = afAuth.authState;
    this.user1$ = JSON.parse(localStorage.getItem('usuario'));

  }

 /*  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/proyectos';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }
 */  

  logout() {
    this.afAuth.auth.signOut();    
    window.location.href = "/login";
    

  }

}
