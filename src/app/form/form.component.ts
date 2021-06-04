import { Component } from '@angular/core';
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
          password: new FormControl('Password', [
            Validators.required,
            Validators.minLength(6),
          ]),
          confirmedPassword: new FormControl('Password', [
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
      name: new FormControl('Name'),
      ownership: new FormControl('Ownership'),
      inn: new FormControl('Taxpayer Identification Number (INN)'),
      kpp: new FormControl('Tax Registration Reason Code (KPP)'),
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

    if (this.form.get('account.passwords')?.hasError('isNotEqual')) {
      return 'Passwords are not equal';
    }

    return this.form.get('account.email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.form.get('account.passwords')?.hasError('isNotEqual')) {
      return 'Passwords are not equal';
    }

    return this.form.get('account.passwords') ? 'Not a valid password' : '';
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data: ', formData);
    }
  }
}
