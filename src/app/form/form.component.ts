import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
      password: new FormControl('Password', [
        Validators.required,
        Validators.minLength(6),
      ]),
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

  getErrorMessage() {
    if (this.form.get('account.email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('account.email') ? 'Not a valid email' : '';
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data: ', formData);
      // console.log(this.form.get('account').get('email').value);
    }
  }
}
