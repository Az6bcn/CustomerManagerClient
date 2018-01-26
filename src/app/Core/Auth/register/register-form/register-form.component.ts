import { AuthService } from "./../../auth-service/auth.service";
import { RoleEnum } from "./../../../../Model/RoleEnum";
import { UserCredentials } from "./../../../../Model/UserCredential";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { IOption } from "ng-select";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // load the register form
    this.LoadRegisterForm();
  }

  private LoadRegisterForm() {
    this.registerForm = RegisterFormComponent.getRegisterForm(this.formBuilder);
  }

  static getRegisterForm(fb: FormBuilder) {
    return fb.group({
      registerGroup: fb.group({
        Username: ["", [Validators.required, Validators.email]],
        Password: ["", [Validators.required, Validators.minLength(8)]],
        Firstname: ["", [Validators.required]],
        Lastname: ["", [Validators.required]],
        Email: ["", [Validators.required, Validators.email]],
        Role: ["", [Validators.required]]
      })
    });
  }

  get username() {
    return this.registerForm.controls["registerGroup"].get("Username");
  }

  get password() {
    return this.registerForm.controls["registerGroup"].get("Password");
  }

  isValid() {
    // console.log(this.registerForm);
    // console.log("registerGroupValidity", this.registerForm.invalid);
    return this.registerForm.invalid;
  }

  get firstname() {
    return this.registerForm.controls["registerGroup"].get("Firstname");
  }

  get lastname() {
    return this.registerForm.controls["registerGroup"].get("Lastname");
  }

  get email() {
    return this.registerForm.controls["registerGroup"].get("Email");
  }

  get role() {
    return this.registerForm.controls["registerGroup"].get("Role");
  }

  registerUser(registerCredentials: UserCredentials) {
    this.authService.register(registerCredentials).subscribe(response => {
      console.log("Response en ts", response);
    });
  }

  managerialRoleOptions: Array<IOption> = [
    { label: "GeneralManager", value: RoleEnum.GeneralManager.toString() },
    { label: "SectionManager", value: RoleEnum.SectionManager.toString() },
    { label: "ProductsManager", value: RoleEnum.SectionManager.toString() },
    {
      label: "CustomerServiceManager",
      value: RoleEnum.CustomerServiceManager.toString()
    }
  ];
}
