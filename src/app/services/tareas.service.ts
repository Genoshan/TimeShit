import { Injectable } from '@angular/core';
import { forEach } from '@firebase/util/dist/esm/src/obj';

@Injectable()
export class TareasService {

  private tareas:any[] = [
    {  
      id:1,
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
      project_id:1, 
      date_last_stage_update:new Date(Date.now()),
      description:"",
      kanban_state:"",
      write_date:new Date(Date.now()),
      active:true,
      delay_hours:0,
      stage_id:0,	
      name:"tarea1",
      date_deadline:new Date(Date.now()),
      reviewer_id:0,
      total_hours:0,
      remaining_hours:0
        },
        {  
          id:2,
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
          project_id:2, 
          date_last_stage_update:new Date(Date.now()),
          description:"",
          kanban_state:"",
          write_date:new Date(Date.now()),
          active:true,
          delay_hours:0,
          stage_id:0,	
          name:"tarea2",
          date_deadline:new Date(Date.now()),
          reviewer_id:0,
          total_hours:0,
          remaining_hours:0
            },
            {  
              id:3,
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
              project_id:3, 
              date_last_stage_update:new Date(Date.now()),
              description:"",
              kanban_state:"",
              write_date:new Date(Date.now()),
              active:true,
              delay_hours:0,
              stage_id:0,	
              name:"tarea3",
              date_deadline:new Date(Date.now()),
              reviewer_id:0,
              total_hours:0,
              remaining_hours:0
                }

  ];
  constructor() { }

  getTareas(key$:number){
    // console.log(this.tareas.find(item => item.project_id >= key$));    
    return this.tareas.find(item => item.project_id == key$);
    
        
  }
}
