import {AbstractControl} from "@angular/forms";

export class MyValidators {

  static equalPasswords(account: AbstractControl): {[key: string]: boolean} | null {
    const password: string = account.get('password')?.value;
    const confirmedPassword = account.get('confirmedPassword')?.value;
    if (password !== confirmedPassword) {
      return {isNotEqual: true};
    }

    return null;
  }
}
