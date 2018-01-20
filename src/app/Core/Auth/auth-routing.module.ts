import { RegisterFormComponent } from './register/register-form/register-form.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'login', component:  AuthLoginComponent},
      {path: 'register', component:  RegisterFormComponent}
    ])
  ],
  declarations: [],
  exports: [RouterModule] // export 'ChildrenRoutes' to import it in auth-module
})
export class AuthRoutingModule { }
