/*******************************************************************GENERIC Global Error Handler*********************************************/
import { ErrorHandler } from '@angular/core';
//ErrorHandler :  search in angular.io
//To display error to the user and log error to the server
export class AppErrorHandler implements ErrorHandler {
    handleError(error){
        alert('An unexpected error ocurred.');
        //Log error message on the server
        //console.log(error);
    }
}


/****
 * Generic Global Error Handler ---> Lo tengo dehabilitado ya que tengo clases para controlar los errores
 * concretos y los otros tipos.
 * 
 * lo he desactivado comentado su linea en el provider del module.ts
 * 
 */