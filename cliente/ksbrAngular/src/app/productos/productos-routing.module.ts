import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { IngredienteFormComponent } from './ingrediente-form/ingrediente-form.component';

const routes: Routes = [
  { path:'productos/gestion-productos', component: GestionProductosComponent},

  { path:'productos/create', component: ProductoFormComponent},

  { path:'ingrediente/create', component: IngredienteFormComponent},

  { path:'productos/update/:id', component: ProductoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
