import { EventEmitter, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Customer } from './../../../Model/Customer';
import { CustomerServiceService } from './../../../Shared/Services/customer-service.service';
import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import Chart from 'chart.js';


@Component({
  selector: 'app-genera-manager-dashboard',
  templateUrl: './genera-manager-dashboard.component.html',
  styleUrls: ['./genera-manager-dashboard.component.css']
})
export class GeneraManagerDashboardComponent implements OnInit, AfterViewInit  {
productManagerCustomers: Array<any>;
customerManagerCustomers: Array<Customer>;
sectionManagerCustomers: Array<Customer>;
isLoading$ = new BehaviorSubject(true);
myPieChart;
data = {
  datasets: [{
      data: [10, 20, 30]
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      'Red',
      'Yellow',
      'Blue'
  ],
  backgroundColor: [
      "#FAEBD7",
      "#DCDCDC",
      "#E9967A"
  ],
  borderColor: [
      "#E9DAC6",
      "#CBCBCB",
      "#D88569"
  ],
  borderWidth: [1, 1, 1]
};

 options = {
  responsive: true,
  title: {
      display: true,
      position: "top",
      text: "Pie Chart",
      fontSize: 18,
      fontColor: "#111"
  },
  legend: {
      display: true,
      position: "bottom",
      labels: {
          fontColor: "#333",
          fontSize: 16
      }
  }
};
  constructor(private customerService: CustomerServiceService) { }

  ngOnInit() {
    this.getCustomersByDifferentManagers();

    const ctx = document.getElementById("myChart");
    this.myPieChart = new Chart('canvas', {
      type: 'pie',
      data: this.data,
      options: this.options
    });

  }

ngAfterViewInit() {

}

getCustomersByDifferentManagers() {
const ProductManager = this.customerService.getCustomersCreatedByProductManager();
const SectionManager = this.customerService.getCustomersCreatedBySectionManager();
const CustomerManager =  this.customerService.getCustomersCreatedByCustomerManager();

forkJoin([ProductManager, SectionManager, CustomerManager])
.finally(() => this.isLoading$.next(false))
.subscribe(
  response => {
if (response) {
  console.log(response);
  this.productManagerCustomers = response[0];

  this.customerManagerCustomers = response[2];

  this.sectionManagerCustomers = response[1];

}
  });
}

}
