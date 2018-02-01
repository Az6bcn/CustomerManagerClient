// ES6 Modules or TypeScript
import swal from 'sweetalert2';


export class ForbiddenError {
     constructor(error: any) {
       console.log("error.statusText", error.statusText);
    this.displayError(error.statusText);
  }


  private displayError(originalError) {

    swal({
      type: 'error',
      title: `Your role is ${originalError} for this action, can't load list`,
      showConfirmButton: false,
      timer: 3500
    });
  }
}
