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
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmedPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
      MyValidators.equalPasswords,
      ),
    profile: new FormGroup({
      name: new FormControl(null),
      phone: new FormControl(null, [
        Validators.minLength(11),
      ]),
      city: new FormControl(null,)
    }),
    company: new FormGroup({
      name: new FormControl(null, [
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
      date: new FormControl(null)
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
          const control: FormControl = new FormControl(null, [
            Validators.required,
            Validators.pattern('[0-9]{9}')
          ]);

          (this.form.get('company') as FormGroup).addControl('kpp', control);
      }
    })
  }

  ngOnInit(): void {
    this.toggleControl();
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  addContact(): void {
    const group: FormGroup = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      job: new FormControl(null, [
        Validators.required,
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(11)
      ])
    });

    (this.form.get('contacts') as FormArray).push(group);
  }

  submit(): void {
    if (this.form.valid) {
      const formData = {...this.form.value};
      console.log('Form data: ', formData);
    }
  }
}
