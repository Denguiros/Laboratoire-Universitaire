import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export class customValidationService {
  static noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
    if((control.value as string).indexOf(' ') >= 0){
        return {noWhiteSpace: true}
    }
    return null;
  }
  static checkLimit(min: number, max: number): ValidatorFn {
   return (c: AbstractControl): { [key: string]: boolean } | null => {
       if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
           return { 'range': true };
       }
       return null;
   };
 }
}
