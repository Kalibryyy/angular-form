import {Component, OnInit,} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../../validators/my.validators";
import {CompanyTypes, CompanyTypesDisplayName, ValidationErrorTexts} from "../../enums/constants";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  CompanyTypes = CompanyTypes;
  CompanyTypesDisplayName = CompanyTypesDisplayName;
  ValidationErrorTexts = ValidationErrorTexts;

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
      ownership: new FormControl('Legal Entity', [
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

  toggleControl(): void {
    this.form.get('company.ownership')?.valueChanges.subscribe(selectedValue => {
      switch (selectedValue) {
        case CompanyTypes.INDIVIDUAL_ENTREPRENEUR:
          (this.form.get('company') as FormGroup).removeControl('kpp');
          break;
        case  CompanyTypes.LEGAL_ENTITY:
          const control = new FormControl(null, [
            Validators.required,
            Validators.pattern('[0-9]{9}')
          ]);

          (this.form.get('company') as FormGroup).addControl('kpp', control);
      }
    })
  }

  ngOnInit() {
    this.toggleControl();
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  addContact(): void {
    const group = new FormGroup({
      name: new FormControl('Name', [
        Validators.required,
      ]),
      job: new FormControl('Job Title', [
        Validators.required,
      ]),
      phone: new FormControl(null, [
        Validators.required,
      ])
    });

    (this.form.get('contacts') as FormArray).push(group);
  }

  getOkpoErrorMessage(): string {
    if (this.form.get('company.okpo')?.hasError('required')) {
      return ValidationErrorTexts.NO_VALUE;
    } else if (this.form.get('company.okpo')?.errors?.pattern.requiredPattern) {
      return ValidationErrorTexts.OKPO_MINLENGTH;
    }

    return this.form.get('company.kpp') ? ValidationErrorTexts.OKPO_NOT_VALID : '';
  }

  getContactsNameErrorMessage(i: number): string {
    if (this.form.get(`contacts.${i}.name`)?.hasError('required')) {
      return ValidationErrorTexts.NO_VALUE;
    }

    return '';
  }

  getContactsJobErrorMessage(i: number): string {
    if (this.form.get(`contacts.${i}.job`)?.hasError('required')) {
      return ValidationErrorTexts.NO_VALUE;
    }

    return '';
  }

  getContactsPhoneErrorMessage(i: number): string {
    if (this.form.get(`contacts.${i}.phone`)?.hasError('required')) {
      return ValidationErrorTexts.NO_VALUE;
    }

    return '';
  }

  submit(): void {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data: ', formData);
    }
  }
}
