import { FormControl } from '@angular/forms';

export class CustomValidators {

  /*
   * Function to control that two password are the same (confirm password)
   */

  static samePassword(control: FormControl) {
    // returns control
    console.log(control);
    return /^\w+\.\w+@gmail\.com$/.test(control.value) ? null : {
      googleEmail : true
    };
  }
}
