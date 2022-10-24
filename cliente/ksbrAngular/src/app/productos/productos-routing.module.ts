import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';

const routes: Routes = [
  { path:'productos/gestion-productos', component: GestionProductosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
