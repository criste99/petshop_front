import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaComponent } from './mascota/mascota.component';
import { DuenoComponent } from './dueno/dueno.component';
import { ComidaComponent } from './comida/comida.component';

const routes: Routes = [
  {path:"mascota",component:MascotaComponent},
  {path:"dueño",component:DuenoComponent},
  {path:"comida",component:ComidaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
