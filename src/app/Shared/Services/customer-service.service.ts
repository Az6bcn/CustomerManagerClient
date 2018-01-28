import { Customer } from './../../Model/Customer';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import { BadRequestError } from '../../Error/bad-request-error';
import { NotFoundError } from '../../Error/not-found-error';
import { AppError } from '../../Error/app-error';
import { UnauthorizedError } from '../../Error/not-authorised';

@Injectable()
export class CustomerServiceService {

  private url: string;

  constructor(private http: Http) { }

  getOptions(): RequestOptions {
// Set Authorization header for the http request, the value of this header should be Bearer with a valid JSON web Token
const headers = new Headers();
// get token from local storage
const token = localStorage.getItem('token');

headers.append('Authorization', 'Bearer ' + token);

// create request Options Object
return new RequestOptions({ headers: headers });

  }


  getCustomersAndOrder(): Observable<Array<Customer>> {

    this.url = 'http://localhost:53800/api/customer/allcustomersorder';

    const options = this.getOptions();

    return this.http.get(this.url, options)
      .map(response =>
        response.json() as Array<Customer>);
  }



  createCustomer(customer: Customer): Observable<Customer> {
    this.url = 'http://localhost:53800/api/customer';

    const options = this.getOptions();

    return this.http.post(this.url, customer, options)
      .map(response => response.json())
      ._catch(this.handleError); // Not calling the Method, just passing a Refrence
    }



    // Method to handle Server Response Error
    private handleError(error: Response) {

      /* Handling Expected Error (Imagine we sending invalid data to the Server response will be Bad Request, status code 400)
              check the status of the response  */
      if (error.status === 400) {
        // return Observable that includes an error and throw an error specific to our application domain type error (BadRequestError)
        return Observable.throw(new BadRequestError(error));
      }

      /* Handling Expected Error (The post might already been deleted and the Server response will be Not found, status code 404):
      check the status of the response )*/
      if (error.status === 404) {
        // return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
        return Observable.throw(new NotFoundError());
      }

      if (error.status === 401) {
        // return Observable that includes an error and throw an error specific to our application domain type error (UnAuthoriseError)
        return Observable.throw(new UnauthorizedError(error));
      }

    // return Observable that includes an error and throw an error (unknown) to our application  domain type error (AppError)
        return Observable.throw(new AppError(error));
    }
  }
