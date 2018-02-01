// ES6 Modules or TypeScript
import swal from 'sweetalert2';

export class AppError {

    constructor(public originalError?: any) {

            const _originalError = originalError.json();

            const customMessage: string = 'There was an error in the Application, Please try again later';

// https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in/28475133
            if (_originalError.errorMessage) {                        // --> If checks for null & underfined
              this.displayError(_originalError.errorMessage);
            }else {
              this.displayError(customMessage);
            }
    }

    private displayError(_originalError) {

        swal({
            type: 'error',
            title: _originalError,
            showConfirmButton: false,
            timer: 3500
        });
    }
}
