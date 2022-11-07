import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import { MesaFormComponent } from './mesa-form/mesa-form.component';


const routes: Routes = [
  { path:'mesas/gestion-mesas',component: GestionMesasComponent},

  {path:'mesas/create', component: MesaFormComponent},
  
  {path:'mesa/update/:id', component: MesaFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesasRoutingModule { }
