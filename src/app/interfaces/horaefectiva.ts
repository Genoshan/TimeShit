import { Proyecto } from "./proyecto";
import { Tarea } from "./tarea";
import { Hora } from "./hora";

export interface Horaefectiva {
    oHora: Hora;
    oProyecto: Proyecto;
    oTarea: Tarea;

}