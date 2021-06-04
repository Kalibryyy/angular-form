import {AbstractControl} from "@angular/forms";

export class MyValidators {

  static equalPasswords(passwords: AbstractControl): {[key: string]: boolean} | null {
    const password: string = passwords.get('password')?.value;
    const confirmedPassword = passwords.get('confirmedPassword')?.value;
    // {password: FormControl, confirmedPassword: FormControl}
    if (password !== confirmedPassword) {
      return {isNotEqual: true};
    }

    return null;
  }
}
