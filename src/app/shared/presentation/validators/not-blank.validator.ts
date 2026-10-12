import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export const notBlankValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim().length === 0 ? {blank: true} : null;
