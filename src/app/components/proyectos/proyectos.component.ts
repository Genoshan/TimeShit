import { ProyectosService } from './../../services/proyectos.service';
import { Proyecto } from './../../interfaces/proyecto';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: []
})
export class ProyectosComponent implements OnInit {

  proyectos:any[] = [];

  proyecto:Proyecto = {

    //nombre:"",
    fechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    id: 0,

    /*
    create_date: new Date(Date.now()),
    write_date: new Date(Date.now()),        
    alias_model: "",
    alias_id:0,	
    write_uid:0,	
    effective_hours: 0,
    planned_hours: 0,
    active:true,
    analytic_account_id: 0, 
    create_uid:0,
    progress_rate: 0,
    sequence: 0,	
    privacy_visibility: "",	
    total_hours: 0,	
    state: "",	
    project_code: "",
    project_escalation_id:0, 
    project_project_resource_calendar_id: 0*/
    
  }

  constructor( private pservice: ProyectosService) { }

  ngOnInit() {
    this.proyectos = this.pservice.getProyectos();
    console.log(this.proyectos);
  }

}
