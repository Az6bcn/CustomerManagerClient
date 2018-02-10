import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SharedDataService } from "../../../Shared/Services/sharedDataService";
import { Customer } from "../../../Model/Customer";
import { Router, ActivatedRoute } from "@angular/router";
import { CountriesListService } from "../../../Shared/Services/countries-list.service";
import { IOption } from "ng-select";
import { CustomerServiceService } from "../../../Shared/Services/customer-service.service";
import swal from "sweetalert2";

@Component({
  selector: "app-customer-edit-form",
  templateUrl: "./customer-edit-form.component.html",
  styleUrls: ["./customer-edit-form.component.css"]
})
export class CustomerEditFormComponent implements OnInit {
  customerForm: FormGroup;
  itemToEdit: Customer;
  initialItemToEdit: Customer;
  private arrayTest = new Array();
  public externalCountriesListAPI: Array<IOption>;
  countryValue: string;
  isUpdating$ = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesListService,
    private customerService: CustomerServiceService
  ) {}

  ngOnInit() {
    this.loadCustomerForm();
    this.countriesService.getCountriesList().subscribe(response => {
      for (const country of response.countries) {
        Object.keys(country).forEach(value => {
          this.arrayTest.push({
            label: country[value].country_name,
            value: country[value].country_name
          });
          this.externalCountriesListAPI = this.arrayTest;
        });
      }
    });
  }

  loadCustomerForm() {
    this.customerForm = CustomerEditFormComponent.getCustomerForm(
      this.formBuilder
    );

    // get the selected item from the sharedDataService
    this.sharedDataService.currentData.subscribe((response: Customer) => {
      this.itemToEdit = response;

      if (this.itemToEdit) {
        this.initialItemToEdit = this.itemToEdit;

        this.countryValue = this.itemToEdit.country;

        this.customerForm.get("customerGroup").setValue({
          id: this.itemToEdit.id,
          firstname: this.itemToEdit.firstName,
          lastname: this.itemToEdit.lastName,
          country: this.itemToEdit.country,
          city: this.itemToEdit.city,
          phone: this.itemToEdit.phone
        });
      }
    });
  }

  // tslint:disable-next-line:member-ordering
  static getCustomerForm(fb: FormBuilder) {
    return fb.group({
      customerGroup: fb.group({
        id: ["", []],
        firstname: ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        country: ["", [Validators.required]],
        city: ["", Validators.required],
        phone: ["", Validators.required]
      })
    });
  }

  get Firstname() {
    return this.customerForm.controls["customerGroup"].get("firstname");
  }

  get Lastname() {
    return this.customerForm.controls["customerGroup"].get("lastname");
  }

  get Country() {
    return this.customerForm.controls["customerGroup"].get("country");
  }

  get City() {
    return this.customerForm.controls["customerGroup"].get("city");
  }

  get Phone() {
    return this.customerForm.controls["customerGroup"].get("phone");
  }

  isValid(customerToCreate: FormGroup): boolean {
    if (this.customerForm.dirty) {
      return false;
    } else return true;
    // return this.customerForm.invalid;
  }

  editCustomer(customerToCreate: FormGroup) {
    this.isUpdating$.next(true);

    const editedItem: Customer = customerToCreate.get("customerGroup").value;

    this.customerService
      .updateCustomer(editedItem)
      .finally(() => this.isUpdating$.next(false))
      .subscribe(response => {
        console.log("Updated response ", response);
        if (response != null) {
          swal("Updated Successfully");
          this.router.navigate(["../general-manager"], {
            relativeTo: this.activatedRoute
          });
        }
      });
  }

  cancel() {
    this.router.navigate(["../general-manager"], {
      relativeTo: this.activatedRoute
    });
  }
}
