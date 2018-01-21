import { CountriesListService } from './../../../Shared/Services/countries-list.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {IOption} from 'ng-select';
import { Country } from '../../../Model/Country';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  private customerForm: FormGroup;
  public externalCountriesListAPI: Array<IOption>;
  private arrayTest= new Array();


  constructor(private formBuilder: FormBuilder,
              private countriesService: CountriesListService) { }

  ngOnInit() {
    this.loadCustomerForm();

    this.countriesService.getCountriesList()
      .subscribe(response => {

        for (let country of response.countries) { // country = object of country,  country:{country_id :"AD"country_name:"ANDORRA"}

          Object.keys(country).forEach((value) => {
            // console.log("Country2222222", country[value]); // return the an Object of the members
            // (console.log("Country",country[value].country_name); // returns a specific Object Member

            // construct new array for ng-select
            this.arrayTest.push(
              {label: country[value].country_name, value: country[value].country_name }
            );
            this.externalCountriesListAPI = this.arrayTest;
          })
        }
      });
  }

private loadCustomerForm(){
  this.customerForm = CustomerFormComponent.getCustomerForm(this.formBuilder);
}

static getCustomerForm(fb: FormBuilder){
    return fb.group({
      customerGroup: fb.group({
      firstname: ["",[Validators.required]],
      lastname: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", Validators.required],
      phone: ["", Validators.required]
    })
  })
  }

  private get Firstname(){
      return this.customerForm.controls['customerGroup'].get('firstname');
  }

private get Lastname(){
  return this.customerForm.controls['customerGroup'].get('lastname');
}

private get Country(){
  return this.customerForm.controls['customerGroup'].get('country');
}

private get City(){
  return this.customerForm.controls['customerGroup'].get('city');
}

private get Phone(){
  return this.customerForm.controls['customerGroup'].get('phone');
}
}



/*Iterating an Object 
var obj = {
  first: "John",
  last: "Doe"
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
    console.log(key + ": " + obj[key]);
  }
}

or

--using Foreach
Object.keys(obj).forEach(key => {
    console.log(obj[key]);
  });



*/


