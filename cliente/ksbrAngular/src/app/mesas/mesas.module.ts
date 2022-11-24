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
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MesaFormComponent } from './mesa-form/mesa-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    GestionMesasComponent,
    DetalleMesasComponent,
    MesaFormComponent
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
    MatDialogModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  exports: [  
  ]
})
export class MesasModule { }
