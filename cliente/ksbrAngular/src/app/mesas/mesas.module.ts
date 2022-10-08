import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';


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
  ]
})
export class MesasModule { }
