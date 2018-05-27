export interface Proyecto {

    /*
    ESTRUCTURA DE DATOS DE PROYECTOS
    */

    //nombre:string;
    fechaInicio:Date;
    Estado:boolean;
    codigoProyecto:string;
    id: number;


    
    // create_date: Date; /*IS 'Created on*/
    // write_date: Date;  /*IS 'Last Updated on'*/      
    // alias_model: string; /*Alias Model' - Siempre "project.task"*/
    // alias_id:number;	/* IS 'Alias' - (mail_alias) - el id de mail asociado al usuario actual*/
    // write_uid:number;	/*IS 'Last Updated by' (res_users)*/
    // effective_hours: number; /*IS 'Time Spent'*/
    // planned_hours: number; /*IS 'Planned Time'*/
    // active:boolean; /*IS 'Active'*/
    // create_uid:number; /*IS 'Created by' (res_users)	*/
    // progress_rate: number; /*IS 'Progress';*/
    // sequence: number;	/*IS 'Sequence';*/
    // privacy_visibility: string;	/*IS 'Privacy / Visibility';*/
    // total_hours: number; /* IS 'Total Time'*/	
    // state: string;	/*IS 'Status'*/
    // project_code: string; /*IS 'Codigo de Proyecto';*/

    // /*Objeto Empresa o Cliente o Compañía para mostrar nombre en base a Id
    // IS 'Contract/Analytic'(account_analytic_account)-el id de compañia*/
    // analytic_account_id: number; 
    
    // //están en null
    // project_escalation_id:number; /*IS 'Project Escalation';(project_project)*/
    // project_project_resource_calendar_id: number; /*IS 'Working Time'; (resource_calendar)*/

    
}

