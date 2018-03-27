import { TareasService } from './services/tareas.service';
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
import { ProyectoComponent } from './proyecto/proyecto.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { HorasComponent } from './components/horas/horas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { KeysPipe } from './pipes/keys.pipe';

//Font Awesome- Iconos
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//JQuery
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProyectosComponent,
    ProyectoComponent,
    TareasComponent,
    TareaComponent,
    HorasComponent,
    LoginComponent,
    KeysPipe
    
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
    AngularFontAwesomeModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    RouterModule.forRoot([
      //Protejo las rutas con el metodo canActivate del AuthGuard Service
      { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
      { path: 'proyecto', component: ProyectoComponent, canActivate: [AuthGuard] },
      //{ path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
      { path: 'tareas/:id', component: TareasComponent, canActivate: [AuthGuard] },
      { path: 'tarea', component: TareaComponent, canActivate: [AuthGuard] },
      { path: 'horas', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent }
    ]),
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    AuthGuard,
    ProyectosService,
    TareasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
