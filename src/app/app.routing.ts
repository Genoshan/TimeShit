import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { HorasComponent } from './components/horas/horas.component';
import { ListarhorasComponent } from './components/horas/listarhoras/listarhoras.component';
import { HorasefectivasComponent } from './components/horas/horasefectivas/horasefectivas.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
          //Protejo las rutas con el metodo canActivate del AuthGuard Service
          { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
          { path: 'proyecto/:id', component: ProyectoComponent, canActivate: [AuthGuard] },
          { path: 'usuario/:Email', component: UsuarioComponent, canActivate: [AuthGuard] },
          { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
          //{ path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
          { path: 'tareas/:id', component: TareasComponent, canActivate: [AuthGuard] },
          { path: 'tarea/:id', component: TareaComponent, canActivate: [AuthGuard] },
          { path: 'horas/:id', component: HorasComponent, canActivate: [AuthGuard] },
          { path: 'horas/tarea/:id', component: HorasComponent, canActivate: [AuthGuard] },
          { path: 'horas/tarea/:nueva', component: HorasComponent, canActivate: [AuthGuard] },
          { path: 'horas/proyecto/:nueva', component: HorasComponent, canActivate: [AuthGuard] },
          { path: 'horas/proyecto/nueva/:id', component: HorasComponent, canActivate: [AuthGuard] },
          { path: 'listarhoras/:id', component: ListarhorasComponent, canActivate: [AuthGuard] },
          { path: 'horasefectivas', component: HorasefectivasComponent, canActivate: [AuthGuard] },
          { path: 'login', component: LoginComponent },      
          { path: '', redirectTo: '/login', pathMatch: 'full'},
          
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

