import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { ActividadesComponent } from "./actividades.component";
import {MaterialesComponent} from "./materiales/materiales.component";
import { ProgramasComponent } from "./programas/programas.component";
import { TalleresComponent } from "./talleres/talleres.component";
import { PersonasComponent } from "./personas/personas.component";
import {CarrerasComponent} from "./carreras/carreras.component";
import {MeditacionComponent} from "./meditacion/meditacion.component";
import {EncuestasComponent} from "./encuestas/encuestas.component";
import { AsistenciasComponent } from "./asistencias/asistencias.component";

/*Es un modulo, es como un archivo javascript*/
const routes: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    children: [
      {
        path: 'materiales',
        component: MaterialesComponent
      },
      {
        path: 'programas',
        component: ProgramasComponent
      },
      {
        path: 'talleres',
        component: TalleresComponent
      },
      {
        path: 'personas',
        component: PersonasComponent
      },
      {
        path: 'carreras',
        component: CarrerasComponent
      },
      {
        path: 'meditaciones',
        component: MeditacionComponent
      },
      {
        path: 'encuestas',
        component: EncuestasComponent
      },
      {
        path: 'asistencia',
        component: AsistenciasComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ActividadesRoutingModule {
}
