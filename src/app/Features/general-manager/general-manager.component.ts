import swal from "sweetalert2";
import { SharedDataService } from "./../../Shared/Services/sharedDataService";
import { Output, EventEmitter } from "@angular/core";
import { ModalComponent } from "./../../Shared/Modal/modal/modal.component";
import { CustomerServiceService } from "./../../Shared/Services/customer-service.service";
import { Customer } from "./../../Model/Customer";
import { Component, OnInit } from "@angular/core";
import { TooltipModule } from "ngx-tooltip";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SimpleModalService } from "ngx-simple-modal";
import { ViewChild, AfterViewInit } from "@angular/core";
import { UserHelper } from "../../Shared/Helper/userHelper";
import { RoleEnum } from "../../Model/RoleEnum";

@Component({
  selector: "app-general-manager",
  templateUrl: "./general-manager.component.html",
  styleUrls: ["./general-manager.component.css"]
})
export class GeneralManagerComponent implements OnInit {
  listView: boolean;
  showTable: boolean;
  public CustomersAndOrders: Array<Customer>;
  public isLoading$ = new BehaviorSubject<boolean>(false);
  editCustomerForm: FormGroup;

  constructor(
    private customerService: CustomerServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private simpleModalService: SimpleModalService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.isLoading$.next(true);
    this.getCustomerData();
    this.getUserRole();
  }

  showCustomerCards() {
    this.showTable = false;

    this.listView = true;
  }

  showTableForListView() {
    this.listView = false;

    this.showTable = true;
  }

  private getCustomerData() {
    this.isLoading$.next(true);
    this.customerService.getCustomersAndOrder().subscribe(response => {
      this.CustomersAndOrders = response;
      this.showTableForListView();
      this.isLoading$.next(false);
    });
  }

  private getHeaderObject(): Object {
    const tableHeader = {
      FirstName: "FirstName",
      Lastname: "Lastname",
      City: "City",
      Country: "Country",
      Phone: "Phone",
      Orders: "Orders"
    };

    return tableHeader;
  }

  private getModelType() {
    return "Customers";
  }

  private newCustomerFormpage() {
    // redirect to the add-new-customers-component
    this.router.navigate(["../new-customer"], {
      relativeTo: this.activatedRoute
    });
  }

  private inComingDataToEdit(itemToEdit: Customer) {
    if (itemToEdit) {
      this.sharedDataService.changeData(itemToEdit); // send selected item to edit to shardDataService

      this.router.navigate(["../edit-customer"], {
        relativeTo: this.activatedRoute
      });
    }
  }

  private getUserRole(): boolean {
    const role = new UserHelper().getRole();
    return role === RoleEnum.GeneralManager ? true : false;
  }

  private incomingDataToDelete(itemToDelete: Customer) {
    if (itemToDelete) {
    this.showConfirm(itemToDelete);
    }
  }

  showConfirm(itemToDelete: Customer) {
    this.simpleModalService.addModal(ModalComponent, {
          title: 'Delete Customer',
          message: 'Are you sure you want to delete this Customer?'
        })
        .subscribe((isConfirmed) => {
            //We get modal result
            if (isConfirmed) { // Ok
                  if (itemToDelete) {
                    if (this.getUserRole()) {
                      // delete the item, send it to the api to delete:
                      this.customerService
                        .deleteCustomer(itemToDelete)
                        .subscribe(response => {
                            const index = this.CustomersAndOrders.indexOf(itemToDelete);
                            this.CustomersAndOrders.splice(index, 1);
                          swal("Customer deleted!");

                        });
                    } else {
                      swal("Only General Managers can delete!");
                    }
                  }
            }
            else { // Cancel

            }
        });
}
}
