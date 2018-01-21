import { Http } from '@angular/http';
import { Injectable } from '@angular/core';import 'rxjs/add/Operator/map';
import 'rxjs/add/Operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Customer } from '../../Model/Customer';
import { Country } from '../../Model/Country';

@Injectable()
export class CountriesListService {
private url: string;

  constructor(private http: Http) { }

 getCountriesList(){
  this.url = 'http://vocab.nic.in/rest.php/country/json';
    return this.http.get(this.url)

    .map(response => response.json());
  }
}




/*
*https://gist.github.com/Keeguon/2310008
*/