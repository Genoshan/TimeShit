import { ProyectosService } from './services/proyectos.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouterModule} from '@angular/router';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgDatepickerModule } from 'ng2-datepicker';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { HorasComponent } from './components/horas/horas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProyectosComponent,
    TareasComponent,
    TareaComponent,
    HorasComponent,
    LoginComponent
  ],
  //ojo con esto...
  exports: [ AppComponent ],

  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,    
    NgDatepickerModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),    
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      //Protejo las rutas con el metodo canActivate del AuthGuard Service
      { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
      { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
      { path: 'tarea', component: TareaComponent, canActivate: [AuthGuard] },
      { path: 'horas', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent }
    ]),
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    AuthGuard,
    ProyectosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
