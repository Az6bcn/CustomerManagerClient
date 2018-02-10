import { UserHelper } from "./../../Shared/Helper/userHelper";
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
  @Output() itemToEditEventEmit = new EventEmitter<any>();

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
    this.getUserClaims();
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

  getUserRole() {
    const role = new UserHelper().getRole();
    return role === RoleEnum.GeneralManager ? true : false;
  }
}
