import { ProyectosService } from './../../services/proyectos.service';
import { Proyecto } from './../../interfaces/proyecto';
import { Usuario } from '../../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
//import { PaginationModule } from 'ngx-pagination-bootstrap';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: []
})
export class ProyectosComponent implements OnInit {
  p: number = 1;
  proyectos:Proyecto[] = [];
  loading:boolean;

  user:Usuario={
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }  

  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    IdProyecto: 0,
  }

  status:string;

  constructor( private pservice: ProyectosService) {
    
   }

   buscar(termino: string) {
    this.loading = true;
    this.proyectos=this.pservice.getProyectoxTermino(termino);
    
  }

  ngOnInit() {
  
    //LISTA PROYECTOS DEL USUARIO DESDE API
    this.user=JSON.parse(localStorage.getItem('usuario'));


    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
    this.pservice.getProyectosUsuario(this.user["CI"])
      .subscribe(        
      correcto => { 
        if(correcto)
        {
          this.proyectos = correcto;        
           
        }
        else{
          this.status = 'error';          
        }
    },(error) => {
      this.status = 'error';
      console.log(error);                    
      } 
    )      
}
}


