import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    GestionMesasComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule,
    MatGridListModule
  ],
  exports: [
    GestionMesasComponent
  ]
})
export class MesasModule { }
