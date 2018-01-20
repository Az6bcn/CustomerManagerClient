import { Customer } from './../../Model/Customer';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomerServiceService {

  private url: string;

  constructor(private http: Http) { }


  getCustomersAndOrder(): Observable<Array<Customer>> {

    // Set Authorization header for the http request, the value of this header should be Bearer with a valid JSON web Token
    let headers = new Headers();
    // get token from local storage
    const token = localStorage.getItem('token');

    headers.append('Authorization', 'Bearer ' + token);

    // create request Options Object
    let options = new RequestOptions({ headers: headers })


    this.url = "http://localhost:53800/api/customer/allcustomersorder"

    return this.http.get(this.url, options)
      .map(response =>
        response.json() as Array<Customer>);
  }
}

