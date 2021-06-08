import {Component} from '@angular/core';
import {FormArray, FormArrayName, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../my.validators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  areContactsShown = false;

  form: FormGroup = new FormGroup({
    account: new FormGroup({
      email: new FormControl('Email', [
        Validators.required,
        Validators.email,
      ]),
      passwords: new FormGroup(
        {
          password: new FormControl(null, [
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
      ownership: new FormControl(null, [
        Validators.required,
      ]),
      inn: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{9}')
      ]),
      kpp: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{9}')
      ]),
      okpo: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{8}')
      ]),
      date: new FormControl('Date')
    }),
    contacts: new FormArray([]),
  });

  get contacts() {
    return this.form.get('contacts') as FormArray;
  }

  addContact() {
    const group = new FormGroup({
      name: new FormControl('Name', [
        Validators.required,
      ]),
      job: new FormControl('Job Title', [
        Validators.required,
      ]),
      phone: new FormControl('Phone', [
        Validators.required,
      ])
    });

    (this.form.get('contacts') as FormArray).push(group);
  }

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

  getCompanyNameErrorMessage() {
    if (this.form.get('company.name')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getOwnershipErrorMessage() {
    if (this.form.get('company.ownership')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getInnErrorMessage() {
    if (this.form.get('company.inn')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.get('company.inn')?.errors?.pattern.requiredPattern) {
      return 'The INN has to be 9 characters long';
    }

    return this.form.get('company.inn') ? 'Not a valid INN' : '';
  }

  getKppErrorMessage() {
    if (this.form.get('company.kpp')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.get('company.kpp')?.errors?.pattern.requiredPattern) {
      return 'The KPP has to be 9 characters long';
    }

    return this.form.get('company.kpp') ? 'Not a valid KPP' : '';
  }

  getOkpoErrorMessage() {
    if (this.form.get('company.okpo')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.get('company.okpo')?.errors?.pattern.requiredPattern) {
      return 'The OKPO has to be 8 characters long';
    }

    return this.form.get('company.kpp') ? 'Not a valid KPP' : '';
  }

  getContactsNameMessage() {
    if (this.form.get('contacts.name')?.hasError('required')) {
      return 'You must enter a value';
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
