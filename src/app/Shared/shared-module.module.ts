import { CustomerServiceService } from './Services/customer-service.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TableListViewComponent } from './table-list-view/table-list-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationComponent, TableListViewComponent],
  providers: [CustomerServiceService],
  // exports the components that belongs to this module that we want to make visible and usable in other modules.
  exports: [CommonModule, TableListViewComponent ]
})
export class SharedModuleModule { }
