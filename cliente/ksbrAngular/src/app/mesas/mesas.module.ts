import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import { GestionMesasComponent } from './gestion-mesas/gestion-mesas.component';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    GestionMesasComponent
  ],
  imports: [
    CommonModule,
    MesasRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: [  
  ]
})
export class MesasModule { }
