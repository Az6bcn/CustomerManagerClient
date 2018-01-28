// ES6 Modules or TypeScript
import swal from 'sweetalert2';


export class UnauthorizedError {
  /**
   *call contructor and pass in it the error from the API
   */
  constructor(error: any) {
    this.displayError(error);
  }

  private displayError(originalErrorObject) {

    swal({
      type: 'error',
      title: `You are ${originalErrorObject.statusText} for this action`,
      showConfirmButton: false,
      timer: 3500
    });
  }
}
