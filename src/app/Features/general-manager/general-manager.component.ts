import { CustomerServiceService } from "./../../Shared/Services/customer-service.service";
import { Customer } from "./../../Model/Customer";
import { Component, OnInit } from "@angular/core";
import { TooltipModule } from "ngx-tooltip";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router, ActivatedRoute } from "@angular/router";

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

  constructor(
    private customerService: CustomerServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading$.next(true);
    this.getCustomerData();
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
}
