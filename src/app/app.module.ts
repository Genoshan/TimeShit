

import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { NgbModule} from  '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule} from '@angular/router';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgDatepickerModule } from 'ng2-datepicker';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { HorasComponent } from './components/horas/horas.component';
import { ListarhorasComponent } from './components/horas/listarhoras/listarhoras.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { KeysPipe } from './pipes/keys.pipe';

//Font Awesome- Iconos
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//JQuery
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

//PAGINATION
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-pagination-bootstrap';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';

//SERVICES
import { TareasService } from './services/tareas.service';
import { ProyectosService } from './services/proyectos.service';
import { UsuarioService } from './services/usuario.service';
import { HttpModule } from '@angular/http';
import { HorasService } from './services/horas.service';

//NUEVOS
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProyectosComponent,
    ProyectoComponent,
    TareasComponent,
    TareaComponent,
    HorasComponent,
    ListarhorasComponent,
    LoginComponent,
    KeysPipe,
    UsuarioComponent,
    LoginUsuarioComponent,
    FooterComponent
    
    
  ],
  //ojo con esto...
  exports: [ AppComponent ],

  imports: [
    FormsModule,
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
    NgxPaginationModule,
    PaginationModule,
    HttpModule,
    RouterModule.forRoot([
      //Protejo las rutas con el metodo canActivate del AuthGuard Service
      { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
      { path: 'proyecto/:id', component: ProyectoComponent, canActivate: [AuthGuard] },
      //{ path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
      { path: 'tareas/:id', component: TareasComponent, canActivate: [AuthGuard] },
      { path: 'tarea/:id', component: TareaComponent, canActivate: [AuthGuard] },
      { path: 'horas/:id', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'horas/tarea/:id', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'horas/tarea/:nueva', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'horas/proyecto/:nueva', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'horas/proyecto/nueva/:id', component: HorasComponent, canActivate: [AuthGuard] },
      { path: 'listarhoras/:id', component: ListarhorasComponent, canActivate: [AuthGuard] },
      //{ path: 'login', component: LoginComponent },
      { path: 'login-usuario', component: LoginUsuarioComponent },      
      { path: '', redirectTo: '/login-usuario', pathMatch: 'full'},
    ]),
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    AuthGuard,
    ProyectosService,
    TareasService,
    UsuarioService,
    HorasService,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
