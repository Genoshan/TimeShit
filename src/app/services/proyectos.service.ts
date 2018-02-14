import { Injectable } from '@angular/core';

@Injectable()
export class ProyectosService {

  private proyectos:any[] = [{
    id: 1,
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
    project_code: "proyecto1",
    project_escalation_id:0, 
    project_project_resource_calendar_id: 0
  },
  {
    id: 2,
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
    project_code: "proyecto2",
    project_escalation_id:0, 
    project_project_resource_calendar_id: 0
  },
  {
    id: 3,
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
    project_code: "proyecto3",
    project_escalation_id:0, 
    project_project_resource_calendar_id: 0
  }]


  constructor() { 

  }

  getProyectos(){
    return this.proyectos;
  }

}
