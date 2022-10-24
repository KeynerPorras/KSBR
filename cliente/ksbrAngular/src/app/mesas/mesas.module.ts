import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DetalleMesasComponent } from './detalle-mesas/detalle-mesas.component';


@NgModule({
  declarations: [
    GestionMesasComponent,
    DetalleMesasComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    MatDialogModule
  ],
  exports: [  
  ]
})
export class MesasModule { }
