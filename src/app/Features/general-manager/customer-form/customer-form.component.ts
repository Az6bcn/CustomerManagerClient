import { CountriesListService } from './../../../Shared/Services/countries-list.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {IOption} from 'ng-select';
import { Country } from '../../../Model/Country';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  private customerForm: FormGroup;
  public externalCountriesListAPI: Array<IOption>;

  constructor(private formBuilder: FormBuilder,
              private countriesService: CountriesListService) { }

  ngOnInit() {
    this.loadCustomerForm();

    this.countriesService.getCountriesList()
    .subscribe(response => {
      this.externalCountriesListAPI = response;
      console.log("responseeee", this.externalCountriesListAPI);
    //   this.externalCountriesListAPI =  [
    //     {label: 'Belgium', value: 'BE'},
    //     {label: 'Luxembourg', value: 'LU'},
    //     {label: 'Netherlands', value: 'NL'}
    // ];
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
