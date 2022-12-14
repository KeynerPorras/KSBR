import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComandasRoutingModule } from './comandas-routing.module';
import { GestionComandasComponent } from './gestion-comandas/gestion-comandas.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DetalleComandasComponent } from './detalle-comandas/detalle-comandas.component';
import { LineaDetalleComponent } from './linea-detalle/linea-detalle.component';
import { ToastrModule } from 'ngx-toastr';
import { ComandaComponent } from './comanda/comanda.component';
import { ComandaOnlineComponent } from './comanda-online/comanda-online.component';
import { PagoComponent } from './pago/pago.component';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';
import { PagoOnlineComponent } from './pago-online/pago-online.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReporteFechasComponent } from './reporte-fechas/reporte-fechas.component';

import { MatNativeDateModule } from '@angular/material/core';
import { ReportePagosComponent } from './reporte-pagos/reporte-pagos.component';
import { ReporteMesasComponent } from './reporte-mesas/reporte-mesas.component';

@NgModule({
  declarations: [
    GestionComandasComponent,
    DetalleComandasComponent,
    LineaDetalleComponent,
    ComandaComponent,
    ComandaOnlineComponent,
    PagoComponent,
    PagoOnlineComponent,
    FormaPagoComponent,
    ReporteFechasComponent,
    ReportePagosComponent,
    ReporteMesasComponent
  ],
  imports: [
    CommonModule,
    ComandasRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    ToastrModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ]
})
export class ComandasModule { }
