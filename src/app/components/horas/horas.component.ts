import { Component, OnInit } from '@angular/core';
import { Hora } from './../../interfaces/hora';

import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styles: []
})
export class HorasComponent implements OnInit {

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

  hora:Hora={

    
    Descripcion:"",
    CantidadHoras:0,
    Fecha:new Date(Date.now()),
    IdTarea: 0

  }
    

  constructor() { }

  ngOnInit() {
  }

}
