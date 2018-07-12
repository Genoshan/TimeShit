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
