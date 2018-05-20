import {Proyecto} from "./proyecto";

export interface Tarea{

nombre:string;
descripcion:string;
fechaInicio:Date;
fechaFIn:Date;

id:number;
create_date:Date;
sequence:number;
write_uid:number;	//(res_users)
effective_hours:number;
planned_hours:number;
partner_id:number; //(res_users)	
create_uid:number; //(res_users)	
user_id:number; //(res_users)	
date_start:Date;
message_last_post:Date;
company_id:number; //(res_company)
progress:number;
project_id:number; //(project_project)	
date_last_stage_update:Date;
description:string;
kanban_state:string;
write_date:Date;
active:boolean;
delay_hours:number;
stage_id:number; //(project_task_type)	
name:string;
date_deadline:Date;
reviewer_id:number; //(res_users)
total_hours:number;
remaining_hours:number;

  
}


/*nombre:string;
  nota:string;
  canthora:number;
  fechainicio:Date;
  fechafin:Date;
  proyecto?: Proyecto;
  key$?:string;*/


// export interface Tarea{
//     nombre:string;
//     nota:string;
//     canthora:number;
//     fechainicio:string;
//     fechafin:string;
//     proyecto?: Proyecto;
//     key$?:string;
//   }