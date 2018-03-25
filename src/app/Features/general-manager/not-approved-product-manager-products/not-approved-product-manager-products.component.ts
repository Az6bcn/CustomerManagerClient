import { Component, OnInit, Input } from '@angular/core';
import { CustomerServiceService } from '../../../Shared/Services/customer-service.service';
import swal from "sweetalert2";


@Component({
  selector: 'app-not-approved-product-manager-products',
  templateUrl: './not-approved-product-manager-products.component.html',
  styleUrls: ['./not-approved-product-manager-products.component.css']
})
export class NotApprovedProductManagerProductsComponent implements OnInit {
@Input() productManagerCustomers: Array<any>;
  constructor(private customerServiceService: CustomerServiceService) { }

  ngOnInit() {
  }

  approvedProduct(product: any) {
    console.log("aprrove", product);
    this.customerServiceService.approveProduct(product)
    .subscribe((response: boolean) => {
      if (response) {
        swal("Approved");
      } else {swal("..something went wrong, Not Approved"); }
    });
    }
}
