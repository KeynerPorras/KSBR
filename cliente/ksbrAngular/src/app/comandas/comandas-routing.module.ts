import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComandasComponent } from './gestion-comandas/gestion-comandas.component';
import { LineaDetalleComponent } from './linea-detalle/linea-detalle.component';

const routes: Routes = [
  { path:'comandas/gestion-comandas', component: GestionComandasComponent},
  { path:'comandas/linea-Detalle', component: LineaDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandasRoutingModule { }
