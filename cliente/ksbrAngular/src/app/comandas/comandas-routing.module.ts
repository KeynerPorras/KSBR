import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComandaOnlineComponent } from './comanda-online/comanda-online.component';
import { ComandaComponent } from './comanda/comanda.component';
import { GestionComandasComponent } from './gestion-comandas/gestion-comandas.component';
import { LineaDetalleComponent } from './linea-detalle/linea-detalle.component';

const routes: Routes = [
  { path:'comandas/gestion-comandas', component: GestionComandasComponent},
  //{ path:'comandas/linea-Detalle', component: LineaDetalleComponent},
 // { path:'comandas/linea-Detalle/:id', component: LineaDetalleComponent},
  { path:'comandas/comanda/:id', component: ComandaComponent},
  { path:'comandas/comanda-online/:id', component: ComandaOnlineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandasRoutingModule { }
