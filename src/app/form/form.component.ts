import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../my.validators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  form: FormGroup = new FormGroup({
    account: new FormGroup({
      email: new FormControl('Email', [
        Validators.required,
        Validators.email,
      ]),
      passwords: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          confirmedPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
        },
        MyValidators.equalPasswords
      )
    }),
    profile: new FormGroup({
      name: new FormControl('Name'),
      phone: new FormControl('Phone'),
      city: new FormControl('City',)
    }),
    company: new FormGroup({
      name: new FormControl('Name', [
        Validators.required,
      ]),
      ownership: new FormControl('Ownership', [
        Validators.required,
        ]),
      inn: new FormControl('Taxpayer Identification Number (INN)', [
        Validators.required,
        Validators.minLength(9),
      ]),
      kpp: new FormControl('Tax Registration Reason Code (KPP)', [
        Validators.required,
        Validators.minLength(9),
      ]),
      okpo: new FormControl('All-Russian Classifier of Entrepreneurs and Organizations (OKPO)'),
      date: new FormControl('Date')
    }),
    contacts: new FormGroup({
      name: new FormControl('Name'),
      job: new FormControl('Job Title'),
      phone: new FormControl('Phone')
    })
  });

  getEmailErrorMessage() {
    if (this.form.get('account.email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('account.email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.form.get('account.passwords.password')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.get('account.passwords.password')?.errors?.minlength) {
      return 'The password has to be minimum 6 characters long';
    }

    return this.form.get('account.passwords.password') ? 'Not a valid password' : '';
  }

  getConfirmedPasswordErrorMessage() {
    if (this.form.get('account.passwords.confirmedPassword')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.get('account.passwords.confirmedPassword')?.errors?.minlength) {
      return 'The password has to be minimum 6 characters long';
    }

    return this.form.get('account.passwords.confirmedPassword') ? 'Not a valid password' : '';
  }

  getPasswordsErrorMessage() {
    if (this.form.get('account.passwords')?.hasError('isNotEqual') && !this.form.get('account.passwords.confirmedPassword')?.invalid) {
      return 'Passwords are not equal';
    }

    return '';
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data: ', formData);
    }
  }
}
