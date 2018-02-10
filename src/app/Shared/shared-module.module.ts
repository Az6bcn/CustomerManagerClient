import { CustomerServiceService } from './Services/customer-service.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TableListViewComponent } from './table-list-view/table-list-view.component';
import { ModalComponent } from './Modal/modal/modal.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { SharedDataService } from './Services/sharedDataService';

@NgModule({
  imports: [
    CommonModule,
    SimpleModalModule.forRoot({container: document.body})
  ],
  declarations: [PaginationComponent, TableListViewComponent, ModalComponent],
  providers: [CustomerServiceService, SharedDataService],
  // Don't forget to add the component to entryComponents section
  entryComponents: [
    ModalComponent
  ],
  // exports the components that belongs to this module that we want to make visible and usable in other modules.
  exports: [CommonModule, TableListViewComponent ] // Don't forget to add the modal component to entryComponents section

})
export class SharedModuleModule { }
