import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComandaOnlineComponent } from './comanda-online/comanda-online.component';
import { ComandaComponent } from './comanda/comanda.component';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';
import { GestionComandasComponent } from './gestion-comandas/gestion-comandas.component';
import { LineaDetalleComponent } from './linea-detalle/linea-detalle.component';
import { PagoOnlineComponent } from './pago-online/pago-online.component';
import { PagoComponent } from './pago/pago.component';
import { ReporteFechasComponent } from './reporte-fechas/reporte-fechas.component';

import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { ReporteMesasComponent } from './reporte-mesas/reporte-mesas.component';

const routes: Routes = [
  { path:'comandas/gestion-comandas', component: GestionComandasComponent},
  //{ path:'comandas/linea-Detalle', component: LineaDetalleComponent},
 // { path:'comandas/linea-Detalle/:id', component: LineaDetalleComponent},
  { path:'comandas/comanda/:id', component: ComandaComponent},
  { path:'comandas/comanda-online', component: ComandaOnlineComponent},
  { path:'comandas/pago/:id/:tipo', component: PagoComponent},
  { path:'comandas/pago-online/:idComanda', component: PagoOnlineComponent},
  { path:'comandas/forma-pago/:id', component: FormaPagoComponent},
  
  { path:'comandas/reporte-fechas', component: ReporteFechasComponent},
  { path:'comandas/reporte-pagos', component: ReportePagosComponent},
  { path:'comandas/reporte-mesas', component: ReporteMesasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandasRoutingModule { }
