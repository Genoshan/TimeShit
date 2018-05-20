import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tarea } from '../../interfaces/tarea';
import { TareasService } from '../../services/tareas.service';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styles: []
})
export class TareasComponent implements OnInit {

  tareas:any[] = [];
  id: number;

  tarea:Tarea = {

    nombre:"",
	  descripcion:"",
    fechaInicio:new Date(Date.now()),
    fechaFIn:new Date(Date.now()),
    
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

  constructor(private tservice: TareasService,
              private router:Router,
              private route: ActivatedRoute) {
                 
    this.route.params
    .subscribe( parametros =>{
      this.id = parametros['id']
      console.log(parametros['id']);      
} );
}
  ngOnInit() {
    this.tareas = this.tservice.getTareas(this.id);
    console.log(this.tareas);
    // this.tservice.getTareas(this.id)
    //     .subscribe( data =>{          
    //       this.tareas = data;
    //       console.log(data);    
  }

}
