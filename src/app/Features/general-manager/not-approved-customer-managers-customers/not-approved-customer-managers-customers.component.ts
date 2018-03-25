import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../Model/Customer';
import { CustomerServiceService } from '../../../Shared/Services/customer-service.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-not-approved-customer-managers-customers',
  templateUrl: './not-approved-customer-managers-customers.component.html',
  styleUrls: ['./not-approved-customer-managers-customers.component.css']
})
export class NotApprovedCustomerManagersCustomersComponent implements OnInit {
@Input() customerManagerCustomers: Array<Customer>;
  constructor(private customerServiceService: CustomerServiceService) { }

  ngOnInit() {
  }

  approvedCustomer(customer: Customer) {
    console.log("aprrove", customer);
    this.customerServiceService.approveCustomer(customer)
    .subscribe((response: boolean) => {
      if (response) {
        swal("Approved");
      } else {swal("..something went wrong, Not Approved"); }
    });
  }
}
