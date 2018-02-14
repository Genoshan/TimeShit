export interface Proyecto {
    id: number;
    create_date: Date;
    write_date: Date;        
    alias_model: string;
    alias_id:number;	/*(mail_alias)*/
    write_uid:number;	/*(res_users)*/
    effective_hours: number;
    planned_hours: number;
    active:boolean;
    analytic_account_id: number; /*(account_analytic_account)*/
    create_uid:number; /*(res_users)	*/
    progress_rate: number;
    sequence: number;	
    privacy_visibility: string;	
    total_hours: number;	
    state: string;	
    project_code: string;
    project_escalation_id:number; /*(project_project)*/
    project_project_resource_calendar_id: number; /*(resource_calendar)*/

}

/*
   nombre:string;
    //nota:string;
    canthora:number;
    tipoProyecto:string;
    key$?:string;
    empresa:string;
*/

/*PROYECTO:
id - int	
create_date - datetime	
Write_date - datetime	
alias_model -	string
Alias_id - int	(mail_alias)
Write_uid - int	(res_users)
Effective_hours - double	
Planned_hours - double	
active	- boolean
analytic_account_id	- int (account_analytic_account)
Create_uid - int (res_users)	
progress_rate	- double
Sequence - int	
Privacy_visibility - string	
Total_hours - double	
State - string	
Project_code - string
Project_escalation_id - integer (project_project)
Project_project_resource_calendar_id (resource_calendar)	

--------------------------------------
PARA FORMATEAR A DATETIME:
var today = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss Z');
---------------------------------------
*/