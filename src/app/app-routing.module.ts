import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaComponent } from './components/mascota/mascota.component';
import { DuenoComponent } from './components/dueno/dueno.component';
import { ComidaComponent } from './components/comida/comida.component';

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
