import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form: FormGroup = new FormGroup({
    account: new FormGroup({
      email: new FormControl('Email'),
      password: new FormControl('Password'),
    }),
    profile: new FormGroup({
      name: new FormControl('Name'),
      phone: new FormControl('Phone'),
      city: new FormControl('City',)
    }),
  });

  submit() {
    console.log('Form submitted: ', this.form.value)
  }
}

// email = new FormControl('', [Validators.required, Validators.email]);
//
// getErrorMessage() {
//   if (this.email.hasError('required')) {
//     return 'You must enter a value';
//   }
//
//   return this.email.hasError('email') ? 'Not a valid email' : '';
// }
