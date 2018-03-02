import { CustomerEditFormComponent } from './/general-manager/customer-edit-form/customer-edit-form.component';
import { ProductServiceService } from './../Shared/Services/product-service.service';
import { CustomerServiceService } from './../Shared/Services/customer-service.service';
import { TooltipModule } from 'ngx-tooltip';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModuleModule } from './../Shared/shared-module.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralManagerComponent } from './general-manager/general-manager.component';
import { SectionManagerComponent } from './section-manager/section-manager.component';
import { ProductsManagerComponent } from './products-manager/products-manager.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { CustomerFormComponent } from './general-manager/customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SelectModule} from 'ng-select';
import { CountriesListService } from '../Shared/Services/countries-list.service';
import { GeneraManagerDashboardComponent } from './general-manager/genera-manager-dashboard/genera-manager-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModuleModule,
    TooltipModule,
    ReactiveFormsModule,
    SelectModule
  ],
  declarations: [GeneralManagerComponent,
    SectionManagerComponent,
    ProductsManagerComponent, OrdersComponent, ProductsComponent, CustomerFormComponent, CustomerEditFormComponent, GeneraManagerDashboardComponent],
  providers: [CustomerServiceService, ProductServiceService, CountriesListService]
})
export class FeaturesModuleModule { }

/*
if don't import the routeModule (routing-module) for this module (FeatureModule),
Error: Error in Maximum call stack size exceeded */
