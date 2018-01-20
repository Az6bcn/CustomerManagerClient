import { Product } from './../../Model/Product';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductServiceService {

  private url;
  constructor(private http: Http) { }

  getProducts(): Observable<Array<Product>> {
// Set Authorization header for the http request, the value of this header should be Bearer with a valid JSON web Token
let headers = new Headers();
// get token from local storage
const token = localStorage.getItem('token');

headers.append('Authorization', 'Bearer ' + token);

// create request Options Object
let options = new RequestOptions({ headers: headers })


this.url = "http://localhost:53800/api/product/products"
      return this.http.get(this.url, options)
      .map(response => response.json() as Array<Product>)
      .do(res => console.log("responseFromApi", res));
  }
}
