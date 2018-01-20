import { UserCredentials } from './../../../Model/UserCredential';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/Operator/map';
import { tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { BadRequestError } from '../../../Error/bad-request-error';
import { NotFoundError } from '../../../Error/not-found-error';
import { AppError } from '../../../Error/app-error';

// https://github.com/auth0/angular2-jwt

@Injectable()
export class AuthService {
private url: string;
  constructor(private http: Http) { }


/**
 * Signs in user, retrieving token from WebAPI and storing it in web token, if no token from API returns false
 */


signIn(credentials: UserCredentials){
/**** CORS */
const headers = new Headers();
headers.append( 'Content-Type', 'application/json' );
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', '  POST');
headers.append('Access-Control-Allow-Origin', '*');
let options = new RequestOptions( {headers: headers});

this.url= "http://localhost:53800/api/accounts/login"
  return this.http.post(this.url, credentials, options)
  .map(response => {     //Use MAP OPERATOR to Transform the Response to Javascript Array.
    const tokenAuthenticationResponse = response.json();
        if (tokenAuthenticationResponse && tokenAuthenticationResponse.auth_token && tokenAuthenticationResponse.auth_token.Result){
          // add to local storage
          localStorage.setItem('token', tokenAuthenticationResponse.auth_token.Result)
          return true;
        }
        else 
        return false;
  })
  ._catch(this.handleError);
}


/**
 * Logs out user, removing token from local storage
 */
logOut(){
  // remove token from local storage
 localStorage.removeItem('token');
}

/**
 * Checks local storage for Token, if no token user already logged out/ not signed in
 */
checkLocalStorageForToken(){
return (localStorage.getItem('token') != null) ? true : false;
}


/**
 * Gets logged-in user's claims
 */
getLoggedInUserClaims(){ 
  
  const token = localStorage.getItem('token');

  if(!token) return null;
  else{
    // Decode the token
    return new JwtHelper().decodeToken(token);
  }

}

/**
 * Checks if user is loggedIn by checking for valid tokenNotExpired in the Local Storage. 
 * returns true if there's valid token that's not expired
 * returns false in contrary case 
 */
isLoggedIn(){
  return tokenNotExpired('token');
}
  



register(registerCredentials){
/**** CORS */
const headers = new Headers();
headers.append( 'Content-Type', 'application/json' );
headers.append('Access-Control-Allow-Headers', 'Content-Type');
headers.append('Access-Control-Allow-Methods', '  POST');
headers.append('Access-Control-Allow-Origin', '*');
let options = new RequestOptions( {headers: headers});

this.url= "http://localhost:53800/api/accounts"

  return this.http.post(this.url, registerCredentials, options)
  .map(response =>  response.json())
       //Catch the error Object which is an Instance of the Response class
       ._catch(this.handleError); //Not calling the Method, just passing a Refrence
}



//Method to handle Server Response Error
private handleError(error: Response) {

  /* Handling Expected Error (Imagine we sending invalid data to the Server response will be Bad Request, status code 400)
          check the status of the response  */
  if (error.status === 400){
    //return Observable that includes an error and throw an error specific to our application domain type error (BadRequestError)
    return Observable.throw(new BadRequestError(error));
  }


  /* Handling Expected Error (The post might already been deleted and the Server response will be Not found, status code 404):
  check the status of the response )*/
  if (error.status === 404) {
    //return Observable that includes an error and throw an error specific to our application  domain type error (NotFoundError)
    return Observable.throw(new NotFoundError())
  }

//return Observable that includes an error and throw an error (unknown) to our application  domain type error (AppError)
    return Observable.throw(new AppError(error));
}
}
      