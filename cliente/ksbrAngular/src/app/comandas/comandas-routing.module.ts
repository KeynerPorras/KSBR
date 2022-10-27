import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComandasComponent } from './gestion-comandas/gestion-comandas.component';

const routes: Routes = [
  { path:'comandas/gestion-comandas', component: GestionComandasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandasRoutingModule { }
