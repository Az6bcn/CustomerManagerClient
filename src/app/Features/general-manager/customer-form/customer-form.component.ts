import { ActivatedRoute, Router } from '@angular/router';
import { CountriesListService } from './../../../Shared/Services/countries-list.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { Country } from '../../../Model/Country';
import { forEach } from '@angular/router/src/utils/collection';
import { Customer } from '../../../Model/Customer';
import { CustomerServiceService } from '../../../Shared/Services/customer-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/finally';
import swal from 'sweetalert2';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  public externalCountriesListAPI: Array<IOption>;
  private arrayTest = new Array();
  isSaving$ = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesListService,
    private customerService: CustomerServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomerForm();

    this.countriesService.getCountriesList().subscribe(response => {
      for (const country of response.countries) {
        // country = object of country,  country:{country_id :' AD' country_name:' ANDORRA' }

        Object.keys(country).forEach(value => {
          // console.log(' Country2222222' , country[value]); // return the an Object of the members
          // console.log('Country', country[value].country_name); // returns a specific Object Member

          // construct new array for ng-select
          this.arrayTest.push({
            label: country[value].country_name,
            value: country[value].country_name
          });
          this.externalCountriesListAPI = this.arrayTest;
        });
      }
    });
  }

  private loadCustomerForm() {
    this.customerForm = CustomerFormComponent.getCustomerForm(this.formBuilder);
  }

  // tslint:disable-next-line:member-ordering
  static getCustomerForm(fb: FormBuilder) {
    return fb.group({
      customerGroup: fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        country: ['', [Validators.required]],
        city: ['', Validators.required],
        phone: ['', Validators.required]
      })
    });
  }

  get Firstname() {
    return this.customerForm.controls['customerGroup'].get('firstname');
  }

  get Lastname() {
    return this.customerForm.controls['customerGroup'].get('lastname');
  }

  get Country() {
    return this.customerForm.controls['customerGroup'].get('country');
  }

  get City() {
    return this.customerForm.controls['customerGroup'].get('city');
  }

  get Phone() {
    return this.customerForm.controls['customerGroup'].get('phone');
  }

  isValid(): boolean {
    return this.customerForm.invalid;
  }

  createNewCustomer(customerToCreate: FormGroup) {
    // console.log('CustomerTocreate is: ', customerToCreate.value);
    this.isSaving$.next(true);
    this.customerService.createCustomer(customerToCreate.controls['customerGroup'].value)
    .finally(() => {
      this.isSaving$.next(false);
    })
    .subscribe((response) => {
      if (response != null) {
        swal('Created Successfully');
          this.router.navigate(['../general-manager'], { relativeTo: this.activatedRoute });
      }
    });
  }
}

/*Iterating an Object
var obj = {
  first: ' John' ,
  last: ' Doe'
};

//
//	Visit non-inherited enumerable keys
//
Object.keys(obj).forEach(function(key) {

  console.log(key, obj[key]);

});

Iterate Json Objects:
-- using For - loop
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key + ' : '  + obj[key]);
  }
}

or

--using Foreach
Object.keys(obj).forEach(key => {
    console.log(obj[key]);
  });



*/
