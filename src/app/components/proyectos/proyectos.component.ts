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

    //nombre:"",
    fechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    id: 0,
  }

  status:string;

  constructor( private pservice: ProyectosService) {
    
   }

   buscar(termino: string) {
    console.log(termino);

    this.loading = true;
    this.proyectos=this.pservice.getProyectoxTermino(termino);
    console.log(this.proyectos);      
  }

  ngOnInit() {
    this.proyectos = this.pservice.getProyectos();
    console.log(this.proyectos);

    //LISTA PROYECTOS DEL USUARIO DESDE API
    this.user=JSON.parse(localStorage.getItem('usuario'));
    this.pservice.getProyectosUsuario(this.user.ci)
      .subscribe(        
      correcto => { 
        if(correcto)this.proyectos = correcto.proyectos
        else{
          this.status = 'error';
          //alert('El usuario no esta');
        }
    },(error) => {
      this.status = 'error';
      //console.log(error);                    

//console.log(this.usuario);      
      } 
    )
      ,      
                error => {
                  this.status = 'error';
                    console.log("error");                    
      ;
    //console.log(this.usuario);      
  }
}
}


