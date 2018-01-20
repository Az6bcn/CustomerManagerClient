// ES6 Modules or TypeScript
import swal from 'sweetalert2'

export class AppError {

    constructor(public originalError?: any) {

            var originalErrorObject = JSON.parse(originalError._body);
            this.displayError(originalErrorObject);
    }

    private displayError(originalErrorObject) {

        swal({
            type: 'error',
            title: originalErrorObject.errorMessage,
            showConfirmButton: false,
            timer: 3500
        })
    }
}