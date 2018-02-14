import { Component, OnInit } from '@angular/core';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Tarea } from '../../interfaces/tarea';

import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styles: []
})
export class TareaComponent implements OnInit {
  
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

   tarea:Tarea = {
    id:0,
    create_date:new Date(Date.now()),
    sequence:0,
    write_uid:0,	
    effective_hours:0,
    planned_hours:0,
    partner_id:0, 
    create_uid:0, 	
    user_id:0, 	
    date_start:new Date(Date.now()),
    message_last_post:new Date(Date.now()),
    company_id:0, 
    progress:0,
    project_id:0, 
    date_last_stage_update:new Date(Date.now()),
    description:"",
    kanban_state:"",
    write_date:new Date(Date.now()),
    active:true,
    delay_hours:0,
    stage_id:0,	
    name:"",
    date_deadline:new Date(Date.now()),
    reviewer_id:0, 
    total_hours:0,
    remaining_hours:0
  }
  constructor() {

    this.options = new NgDatepickerModule();
    
   }

  ngOnInit() {
  }

}
