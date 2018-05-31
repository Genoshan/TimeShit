import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { ProyectosService } from '../../services/proyectos.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{

    /*****ATRIBUTOS******/

    proyecto:Proyecto= {
      
      fechaInicio:new Date(Date.now()),
      Estado:true,
      codigoProyecto:"",
      id: 0,    
  }

  nuevo:boolean=false;
  id:string;

  /********CONSTRUCTOR******/

  constructor(private pr:ProyectosService,
    private activatedRoute:ActivatedRoute){
    this.activatedRoute.params
      .subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
      } )
  }

  /*****OPERACIONES*****/

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
      console.log(this.proyecto,this.id);
      /*.subscribe( data=>{
      console.log(data);
    },
    error=> console.error(error));
    */
    }
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ngOnInit() {
    this.getProyecto();
    console.log(this.proyecto);
  }

}
