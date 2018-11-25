// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-proyecto',
//   templateUrl: './proyecto.component.html',
//   styleUrls: ['./proyecto.component.css']
// })
// export class ProyectoComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { ProyectosService } from '../../services/proyectos.service';
import { Router,ActivatedRoute } from '@angular/router';

import {Location} from '@angular/common';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{

    /*****ATRIBUTOS******/

    proyecto:Proyecto= {
      
      FechaInicio:new Date(Date.now()),
      Estado:true,
      Nombre:"",
      codigoProyecto:"",
      IdProyecto: 0,    
  }

  nuevo:boolean=false;
  id:string;
  

  /********CONSTRUCTOR******/

  constructor(private pr:ProyectosService,
    private activatedRoute:ActivatedRoute,
    private _location: Location){
    this.activatedRoute.params
      .subscribe(parametros => {        
        this.id = parametros['id'];
      } )
  }

  /*****OPERACIONES*****/

  //Ir Atras
backClicked() {
  this._location.back();
}

  getProyecto(){
        if (this.id=="nuevo")
        {

        }
        else{
          this.proyecto=this.pr.getProyecto(Number(this.id));
          
        }        
      }


  crearProyectos(){
    if (this.id=="nuevo")
    {
      // insertando
      this.pr.crearProyectos(this.proyecto)
      /*.subscribe( data=>{
        this.activatedRoute.navigate(['/proyecto',data.name])
    },
    error=> console.error(error)
  );*/

    }
    else
    {
      //actualizando      
      this.pr.editarProyectos(this.proyecto, this.id)            
    }
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ngOnInit() {
    this.getProyecto();    
  }

}



