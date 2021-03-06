  import { Usuario } from './../../interfaces/usuario';
  import { Component, OnInit } from '@angular/core';
  import { Hora } from './../../interfaces/hora';
  
  import { Tarea } from './../../interfaces/tarea';
  import { Proyecto } from '../../interfaces/proyecto';
  
  
  
  import { NgDatepickerModule } from 'ng2-datepicker';
  import { DatepickerOptions } from 'ng2-datepicker';
  import * as frLocale from 'date-fns/locale/fr';
  import { TareasService } from '../../services/tareas.service';
  import { ProyectosService } from '../../services/proyectos.service';
  import { HorasService } from '../../services/horas.service';
  import { ActivatedRoute, Router } from '@angular/router';
  
  @Component({
    selector: 'app-horas',
    templateUrl: './horas.component.html',
    styles: []
  })
  export class HorasComponent implements OnInit {
    
    /*****ATRIBUTOS******/  
    
    nuevo:boolean=false;
    id:string;
    
    proyectos:Proyecto[] = [];
    tareas:Tarea[] = [];
    
    user: Usuario = {
      nombre: "",
      email: "",    
      img: "",
      ci: ""
    }
    
    hora:Hora={    
      Idhora:0,
      Descripcion:"",
      CantidadHoras:0,
      Fecha:new Date(Date.now()),
      IdTarea: 0
    }
    
    proyecto:Proyecto= {
      
      FechaInicio:new Date(Date.now()),
      Estado:true,
      Nombre:"",
      codigoProyecto:"",
      IdProyecto: 0,    
    }
    
    tarea:Tarea = {
      
      IdTarea: 0,
      Nombre: "",
      Descripcion: "",
      FechaInicio:new Date(Date.now()),
      FechaFIn: new Date(Date.now()),
      IdProyecto:0  
    }
    
    status:string;
    
    
    constructor(private ts:TareasService,private pr:ProyectosService, private hs:HorasService,
      private activatedRoute:ActivatedRoute, private router: Router){
        this.activatedRoute.params
        .subscribe(parametros => {        
          this.id = parametros['id'];
        } )    
      }
      
      /*****OPERACIONES*****/
      
      getHora(){
        
        //FLUJO NORMAL: LLEGO NAVEGANDO DESDE PROYECTO Y DE UNA TAREA Y VEO LAS HORAS CARGADAS y cargo una nueva
        if (this.router.url == '/horas/nueva')
        {
          //FLUJO NORMAL: LLEGO NAVEGANDO DESDE PROYECTO Y DE UNA TAREA Y VEO LAS HORAS CARGADAS
          //OBTENGO, USUARIO, TAREA Y PROYECTO POR EL CUAL LLEGO DE LA NAVEGACION DEL LOCALSTORAGE    
          this.tarea=JSON.parse(localStorage.getItem('tarea'));
          this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
          
          //Agrego la tarea y el proyecto a las listas locales de proyecto y tarea obtenidos por los servicios a cada combo
          
          this.proyectos.push(this.proyecto);
          this.tareas.push(this.tarea);
          
          
          //OBTENGO LA TAREA      
          this.hora.IdTarea = this.tarea.IdTarea;           
          this.tarea.IdProyecto = this.proyecto.IdProyecto;
          
          //OBTENGO EL PROYECTO
          this.proyecto = this.pr.getProyecto(Number(this.tarea.IdProyecto));      
        }
        else{
          
          //CONTROL DESDE DONDE ESTOY ACCEDIENDO    
          //SI ES DESDE TAREAS (ICONO + EN CADA TAREA)
          if((this.router.url == '/horas/tarea/'+this.id)&&this.id!='nueva'){
            
            //OBTENGO LA TAREA            
            this.tarea = this.ts.getTarea(Number(this.id));          
            //GUARDO TAREA EN EL STORAGE       
            localStorage.setItem('tarea',JSON.stringify(this.tarea));
            
            this.tarea=JSON.parse(localStorage.getItem('tarea'));  
            //OBTENGO EL PROYECTO DE LA TAREA
            this.proyecto = this.pr.getProyecto(Number(this.tarea.IdProyecto));
            //GUARDO PROYECTO EN EL STORAGE       
            localStorage.setItem('proyecto',JSON.stringify(this.proyecto));
            //cargo listas locales para los combos:
            this.proyectos.push(this.proyecto);
            this.tareas.push(this.tarea);
            
            //ASIGNO IDTAREA DE HORA A CREAR
            //OBTENGO LA TAREA      
            this.hora.IdTarea = this.tarea.IdTarea;           
            this.tarea.IdProyecto = this.proyecto.IdProyecto;
            this.hora.IdTarea = this.tarea.IdTarea;
          }   
          
          else {
            //CONTROL DESDE DONDE ESTOY ACCEDIENDO    
            //SI ES DESDE TAREAS (ICONO + GRANDE)  
            if(this.router.url == '/horas/tarea/nueva')
            {
              //OBTENGO EL PROYECTO
              this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
              this.proyectos.push(this.proyecto);      
              
              //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
              this.ts.getTareasDeProyecto(Number(this.proyecto.IdProyecto))
              .subscribe(        
                correcto => { 
                  if(correcto)
                  {
                    //vacio las tareas y las vuelvo a cargar.
                    this.tareas = null;
                    this.tareas = correcto;
                    //OBTENGO LA TAREA      
                    this.hora.IdTarea = this.tareas[0].IdTarea;
                    this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                    //console.log(this.tareas);
                  }
                  else{
                    this.status = 'error';            
                  }
                },(error) => {
                  this.status = 'error';
                  console.log(error);                    
                })
                
                //OBTENGO LA TAREA      
                //this.hora.IdTarea = this.tarea.IdTarea;           
                //this.tarea.IdProyecto = this.proyecto.IdProyecto;
                
              }
              else {
                //CARGANDO HORAS DESDE UN PROYECTO dado boton +
                if((this.router.url == '/horas/proyecto/nueva/'+this.id)&&this.id!='nueva'){
                  
                  //OBTENGO EL PROYECTO:        
                  this.proyecto = this.pr.getProyecto(Number(this.id));
                  this.proyectos.push(this.proyecto);
                  //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
                  this.ts.getTareasDeProyecto(Number(this.proyecto.IdProyecto))
                  .subscribe(        
                    correcto => { 
                      if(correcto)
                      {
                        //vacio las tareas y las vuelvo a cargar.
                        this.tareas = null;
                        this.tareas = correcto;
                        //OBTENGO LA TAREA      
                        this.hora.IdTarea = this.tareas[0].IdTarea;
                        this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                        //console.log(this.tareas);
                      }
                      else{
                        this.status = 'error';            
                      }
                    },(error) => {
                      this.status = 'error';
                      console.log(error);                    
                    })
                    
                    //OBTENGO LA TAREA      
                    //this.hora.IdTarea = this.tarea.IdTarea;           
                    //this.tarea.IdProyecto = this.proyecto.IdProyecto;      
                    
                  }
                  else {
                    
                    //CARGANDO HORAS DESDE PROYECTOS BOTON GRANDE+  
                    if (this.router.url == '/horas/proyecto/nueva')
                    {
                      
                      //listo todos los proyectos del usuario --
                      //LISTA PROYECTOS DEL USUARIO DESDE API
                      this.user=JSON.parse(localStorage.getItem('usuario'));
                      //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
                      this.pr.getProyectosUsuario(this.user["CI"])
                        .subscribe(        
                        correcto => { 
                          if(correcto)
                          {
                            //vacio los proyectos y los vuelvo a cargar.
                            this.proyectos = null;
                            this.proyectos = correcto;                            
                            //para la primer carga queda el primer proyecto seleccionado
                            this.tarea.IdProyecto = this.proyectos[0].IdProyecto;

                            this.ts.getTareasDeProyecto(Number(this.tarea.IdProyecto))
                      .subscribe(        
                        correcto => { 
                          if(correcto)
                          {
                            //vacio las tareas y las vuelvo a cargar.
                            this.tareas = null;
                            this.tareas = correcto;
                            //selecciono la primer tarea de la lista del proyecto cargado
                            this.hora.IdTarea = this.tareas[0].IdTarea;
                            this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                            //console.log(this.tareas);                            
                          }
                          else{
                            this.status = 'error';            
                          }
                        },(error) => {
                          this.status = 'error';
                          console.log(error);                    
                        })

                            console.log(this.tarea.IdProyecto);                          
                          }
                          else{
                            this.status = 'error';          
                          }
                      },(error) => {
                        this.status = 'error';
                        console.log(error);                    
                        } 
                      )

                      //en base al proyecto seleccionado, listar las tareas de ese proyecto
                      //para esto utilizo el evento onProyectoChange
                      console.log("antes de cargar las tareas");
                      //TODO
                      //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS
                      /* console.log(this.proyectos); */
                      console.log(this.proyecto.IdProyecto);
                      console.log(this.tarea.IdProyecto);

                      
                    
                    //OBTENGO LA TAREA      
                    //this.hora.IdTarea = this.tarea.IdTarea;           
                    //this.tarea.IdProyecto = this.proyecto.IdProyecto;                          

                    }
                    else { 
                      
                      //SI LLEGO DESDE HORAS,
                      //ES CUANDO ESTOY EDITANDO UNA HORA CARGADA  
                      
                      //OBTENGO LA HORA SEGUN SU ID    
                      this.hora=this.hs.getHora(Number(this.id));  
                      //OBTENGO LA TAREA PARA LA HORA SELECCIONADA
                      this.tarea=this.ts.getTarea(Number(this.hora.IdTarea));
                      //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
                      this.proyecto=this.pr.getProyecto(this.tarea.IdProyecto);
                      
                      //CARGO COMBOS
                      this.proyectos.push(this.proyecto);
                      this.tareas.push(this.tarea);
                    }
                  }
                }
                
              }}        
            }
            
            CargarHoras(){
              //creando
              if (this.id=="nueva")
              {
                
                this.hs.CargarHoras(this.hora, this.user["CI"])
                .subscribe(        
                  correcto => { 
                    if(correcto)
                    {          
                      this.hora = correcto;          
                    }
                    else{
                      this.status = 'error';          
                    }
                  },(error) => {
                    this.status = 'error';
                    console.log(error);                    
                  } 
                )
              }
              else
              {
                if(this.router.url == '/horas/tarea/'+this.id){
                  //cargando una hora nueva desde boton + de tareas
                  this.hs.CargarHoras(this.hora, this.user["CI"])
                  .subscribe(        
                    correcto => { 
                      if(correcto)
                      {          
                        this.hora = correcto;          
                      }
                      else{
                        this.status = 'error';          
                      }
                    },(error) => {
                      this.status = 'error';
                      console.log(error);                    
                    } 
                  )
                }
                else
                {
                  
                  if(this.router.url == '/horas/proyecto/nueva'){

                    this.hs.CargarHoras(this.hora, this.user["CI"])
                    .subscribe(        
                      correcto => { 
                        if(correcto)
                        {          
                          this.hora = correcto;          
                        }
                        else{
                          this.status = 'error';          
                        }
                      },(error) => {
                        this.status = 'error';
                        console.log(error);                    
                      } 
                    )
                  }
                  else{
                    if ((this.router.url == '/horas/proyecto/nueva/'+this.id)&&this.id!='nueva'){
                      //cargando horas desde un proyecto dado boton + de un proyecto
                      //cargando una hora nueva desde boton + de tareas
                      this.hs.CargarHoras(this.hora, this.user["CI"])
                      .subscribe(        
                        correcto => { 
                          if(correcto)
                          {          
                            this.hora = correcto;          
                          }
                          else{
                            this.status = 'error';          
                          }
                        },(error) => {
                          this.status = 'error';
                          console.log(error);                    
                        } 
                      )
                    }
                    else {                      
                      
                      //actualizando una hora ya existente   
                      this.hs.editarHoras(this.hora)  
                      .subscribe(        
                        correcto => { 
                          if(correcto)
                          {
                            //this.proyectos = JSON.parse(correcto.proyectos);
                            this.hora = correcto;
                            //console.log(this.tareas);
                          }
                          else{
                            this.status = 'error';
                            //alert('El usuario no esta');
                          }
                        },(error) => {
                          this.status = 'error';
                          console.log(error);                    
                        } 
                      )    
                    }
                  }
                }
              }
            }

            onProyectoChange()
            {
              console.log(this.tarea.IdProyecto);
              
              this.ts.getTareasDeProyecto(Number(this.tarea.IdProyecto))
                      .subscribe(        
                        correcto => { 
                          if(correcto)
                          {
                            //vacio las tareas y las vuelvo a cargar.
                            this.tareas = null;
                            this.tareas = correcto;
                            //selecciono la primer tarea de la lista del proyecto cargado
                            this.hora.IdTarea = this.tareas[0].IdTarea;
                            this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                            //console.log(this.tareas);                            
                          }
                          else{
                            this.status = 'error';            
                          }
                        },(error) => {
                          this.status = 'error';
                          console.log(error);                    
                        })
                    
                    //OBTENGO LA TAREA      
                    //this.hora.IdTarea = this.tarea.IdTarea;           
                    //this.tarea.IdProyecto = this.proyecto.IdProyecto;      
            }           
            
            /**** CARGA INICIAL DEL COMPONENTE *****/
            ngOnInit() {
              //OBTENGO USUARIO DE LA LOCAL STORAGE
              this.user=JSON.parse(localStorage.getItem('usuario'));
              this.getHora();
            }
            
          }
