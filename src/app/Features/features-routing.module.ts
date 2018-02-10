import { CustomerEditFormComponent } from './general-manager/customer-edit-form/customer-edit-form.component';
import { CustomerFormComponent } from './general-manager/customer-form/customer-form.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';
import { SectionManagerComponent } from './section-manager/section-manager.component';
import { GeneralManagerComponent } from './general-manager/general-manager.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'general-manager', component:  GeneralManagerComponent},
      {path: 'new-customer', component:  CustomerFormComponent},
      {path: 'edit-customer', component: CustomerEditFormComponent},
      {path: 'section-manager', component:  SectionManagerComponent},
      {path: 'products-manager', component: ProductsManagerComponent},
      {path: 'orders', component:  OrdersComponent},
      {path: 'products', component: ProductsComponent}
    ])
  ],
  declarations: [],
  exports: [RouterModule] // export 'ChildrenRoutes' to import it in features-module
})
export class FeaturesRoutingModule { }



