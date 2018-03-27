export interface Proyecto {
    id: number; 
    create_date: Date; /*IS 'Created on*/
    write_date: Date;  /*IS 'Last Updated on'*/      
    alias_model: string; /*Alias Model' - Siempre "project.task"*/
    alias_id:number;	/* IS 'Alias' - (mail_alias) - el id de mail asociado al usuario actual*/
    write_uid:number;	/*IS 'Last Updated by' (res_users)*/
    effective_hours: number; /*IS 'Time Spent'*/
    planned_hours: number; /*IS 'Planned Time'*/
    active:boolean; /*IS 'Active'*/
    create_uid:number; /*IS 'Created by' (res_users)	*/
    progress_rate: number; /*IS 'Progress';*/
    sequence: number;	/*IS 'Sequence';*/
    privacy_visibility: string;	/*IS 'Privacy / Visibility';*/
    total_hours: number; /* IS 'Total Time'*/	
    state: string;	/*IS 'Status'*/
    project_code: string; /*IS 'Codigo de Proyecto';*/

    /*Objeto Empresa o Cliente o Compañía para mostrar nombre en base a Id
    IS 'Contract/Analytic'(account_analytic_account)-el id de compañia*/
    analytic_account_id: number; 
    
    //están en null
    project_escalation_id:number; /*IS 'Project Escalation';(project_project)*/
    project_project_resource_calendar_id: number; /*IS 'Working Time'; (resource_calendar)*/

    /*
    ESTOS HAY QUE ASIGNARLOS POR ATRAS Y NO POR FRONT AL CREAR EL PROYECTO.
    write_date: new Date(Date.now()),  -      
    alias_model: "", - 
    alias_id:0,	- el usuario actual
    write_uid:0, -	
    effective_hours: 0, -        
    create_uid:0, -
    progress_rate: 0, -
    sequence: 0,	
    privacy_visibility: "",	
    total_hours: 0,	-
    analytic_account_id: 0, -?
    project_escalation_id:0, ?
    project_project_resource_calendar_id: 0 ?
    
    */
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

