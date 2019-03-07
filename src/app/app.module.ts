import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { HorasComponent } from './components/horas/horas.component';
import { HorasefectivasComponent } from './components/horas/horasefectivas/horasefectivas.component';
import { ListarhorasComponent } from './components/horas/listarhoras/listarhoras.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

import { routingModule } from "./app.routing";

//import { MatButtonModule, MatCardModule, MatFormFieldModule,MatDialog, MatDialogRef,MatDialogModule } from '@angular/material';

import { MatListModule,MatButtonModule, MatCardModule, MatSelectModule,
  MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule,MatFormFieldModule,MatCheckboxModule } from '@angular/material';


//SERVICES
import { TareasService } from './services/tareas.service';
import { ProyectosService } from './services/proyectos.service';
import { UsuarioService } from './services/usuario.service';
import { HttpModule } from '@angular/http';
import { HorasService } from './services/horas.service';

import { NgxPaginationModule } from 'ngx-pagination';
//import { PaginationModule } from 'ngx-pagination-bootstrap';

//Angular Material
import {MatExpansionModule} from '@angular/material';
//FORMS
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KeysPipe } from './pipes/keys.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HorasComponent,
    HorasefectivasComponent,
    ListarhorasComponent,
    ProyectosComponent,
    ProyectoComponent,
    TareasComponent,
    TareaComponent,
    LoginComponent,
    UsuarioComponent,
    KeysPipe,
    UsuariosComponent,
    EscapeHtmlPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    routingModule,
    UiModule,
    HttpModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule,MatFormFieldModule, 
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    NgbModule    
//    PaginationModule,    
  ],
  providers: [HttpModule,
    UsuarioService,
  ProyectosService,
TareasService,
HorasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
