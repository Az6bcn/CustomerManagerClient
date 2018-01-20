import { NotFoundComponent } from './not-found/not-found.component';
import { AuthModuleModule } from './Core/Auth/auth-module.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeaturesModuleModule } from './Features/features-module.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: "", redirectTo: '/home', pathMatch: 'full'},
      {path: "home", component: HomeComponent },
      {path: "account", loadChildren: "./Core/Auth/auth-module.module#AuthModuleModule"},
      {path: "customer-manager", loadChildren: './Features/features-module.module#FeaturesModuleModule'},
      {path: '**', component:  NotFoundComponent}
    ])
  ],
  declarations: [],
  exports: [RouterModule]  // export 'Routes' to import it in root app-module
})
export class AppRoutingModule { }
