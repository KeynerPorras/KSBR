import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComandaOnlineComponent } from './comanda-online/comanda-online.component';
import { ComandaComponent } from './comanda/comanda.component';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';
import { GestionComandasComponent } from './gestion-comandas/gestion-comandas.component';
import { LineaDetalleComponent } from './linea-detalle/linea-detalle.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  { path:'comandas/gestion-comandas', component: GestionComandasComponent},
  //{ path:'comandas/linea-Detalle', component: LineaDetalleComponent},
 // { path:'comandas/linea-Detalle/:id', component: LineaDetalleComponent},
  { path:'comandas/comanda/:id', component: ComandaComponent},
  { path:'comandas/comanda-online', component: ComandaOnlineComponent},
  { path:'comandas/pago/:id/:tipo', component: PagoComponent},
  { path:'comandas/pago-online/:idComanda', component: PagoComponent},
  { path:'comandas/forma-pago/:id', component: FormaPagoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandasRoutingModule { }
