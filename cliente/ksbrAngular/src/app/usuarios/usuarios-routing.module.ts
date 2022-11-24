import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  { path:'usuarios/gestion-usuarios', component: GestionUsuariosComponent},

  { path:'usuarios/create', component: UsuarioFormComponent},

  { path:'usuarios/update/:id', component: UsuarioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
