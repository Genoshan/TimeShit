import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { ProyectosService } from '../../services/proyectos.service';



@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date'
  };

    proyecto:Proyecto= {
    id: 0,
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
    project_project_resource_calendar_id: 0
  }


  constructor(private pr:ProyectosService) { }

  crearProyectos(){
    console.log(this.proyecto);
    this.pr.crearProyectos(this.proyecto);
  }

  ngOnInit() {
  }


}
