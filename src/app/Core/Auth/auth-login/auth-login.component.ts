import { AuthService } from './../auth-service/auth.service';
import { UserCredentials } from './../../../Model/UserCredential';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/finally';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})

export class AuthLoginComponent implements OnInit {
  logInForm: FormGroup;
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    // load Login Form
    this.LoadLoginForm();
    // console.log('myForm', this.logInForm);
  }

  LoadLoginForm() {
    this.logInForm = AuthLoginComponent.getLoginForm(this.formBuilder);
  }

  // tslint:disable-next-line:member-ordering
  static getLoginForm(fb: FormBuilder) {
    return fb.group({
      loginGroup: fb.group({
        Username: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8)]]
      })
    });
  }

  /**
   *  Gets the Object of the Paasword control in the loginGroup FormGroup of the logInForm FormGroup.
   */
  get password() {
    // console.log('passwordControl',this.logInForm.controls['loginGroup'].get('Password') );
    return this.logInForm.controls['loginGroup'].get('Password');
  }

  /**
   * Gets the form validity status, invalid returns true
   */
  isValid() {
    // console.log('loginFormValidity', this.logInForm.invalid);
    return this.logInForm.invalid;
  }

  signInAndRedirectUser(logInCredentials: UserCredentials) {
    this.isLoading$.next(true);

    this.authService.signIn(logInCredentials)
    .finally(() => {
      this.isLoading$.next(false);
    })
    .subscribe(response => {
      // if true: contains token, then decode it to know where to redirect
      if (response) {
        const loggedInUserClaims = this.authService.getLoggedInUserClaims();

        this.router.navigate(['../../customer-manager/general-manager'], {
          relativeTo: this.activatedRoute
        });
      }
    });
  }
}
