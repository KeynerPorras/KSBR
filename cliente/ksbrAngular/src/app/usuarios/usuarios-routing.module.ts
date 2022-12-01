import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

import { UserCreateComponent } from './user-create/user-create.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path:'usuarios/gestion-usuarios', component: GestionUsuariosComponent},

  { path:'usuarios/create', component: UsuarioFormComponent},

  { path:'usuarios/update/:id', component: UsuarioFormComponent},

  {
    path: 'usuarios',
    component: UserIndexComponent,
    children: [
      { path: 'registrar', component: UserCreateComponent },
      { path: 'login', component: UserLoginComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
