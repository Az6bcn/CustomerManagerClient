import { SelectModule } from 'ng-select';
import { AuthService } from './auth-service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppErrorHandler } from '../../Error/app-error-handle';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule, // import RouterModuler so i can use RouterLink in any component in  this CoreModule
    FormsModule,
    ReactiveFormsModule, // to use forms in any components of this module
    SelectModule
  ],
  declarations: [
    AuthLoginComponent,
    RegisterFormComponent,
    NavBarComponent
  ], 
  providers:[AuthService],
   /* {provide: ErrorHandler, useClass: AppErrorHandler}],Register Global Generic error handler like this: Tells Angular that weherever 
    internally we are using 'ErrorHandler' instead use 'AppErrorHandler' */
  exports: [NavBarComponent ]
})
export class AuthModuleModule { }



/* 
if don't import the routeModule (routing-module) for this module (CoreModule),
Error: Error in Maximum call stack size exceeded */ 