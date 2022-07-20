import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    mail: new FormControl(''),
  });

  messageFname: string = '';
  messageLname: string = '';
  messageMail: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _UserService: UsersService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      fname: [null, [Validators.required, Validators.min(3)]],
      lname: [null, [Validators.required, Validators.min(3)]],
      mail: [
        null,
        [
          Validators.required,
          Validators.pattern(`[\w\.=-]+@[\w\.-]+\.[\w]{2,3}`),
        ],
      ],
      subForm: this._formBuilder.array([]),
    });
    this.getArrayControl().push(new FormControl(null, null));
  }

  getArrayControl() {
    return this.formGroup.get('subForm') as FormArray;
  }

  submit() {
    const value = this.formGroup.value;
    if (this.controlValue(value)) this.sendRequest(value);
  }

  sendRequest(value: any) {
    const body: any = {
      firstName: value.fname,
      lastName: value.lname,
      mail: value.mail,
    };

    this._UserService.setUser(body);
    setTimeout(() => {
      this._Router.navigate(['list']);
    }, 1000);
  }

  controlValue(value: any) {
    const fname: String = value.fname;
    const lname: String = value.lname;
    const mail: String = value.mail;

    const RegexName: any = /^[a-zA-Z]{3,}$/;
    const RegexMail: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let control: boolean = false;

    if (fname != null) {
      if (!fname.match(RegexName)) {
        this.messageFname = 'Incorrect characters';
      } else {
        this.messageFname = '';
        control = true;
      }
    } else this.messageFname = 'Minimum 3 characters';

    if (lname != null) {
      if (!lname.match(RegexName)) {
        this.messageLname = 'Incorrect characters';
      } else {
        this.messageLname = '';
        control = true;
      }
    } else this.messageLname = 'Minimum 3 characters';

    if (mail != null) {
      if (!mail.match(RegexMail)) {
        this.messageMail = 'Incorrect exemple : abc@abc.com';
      } else {
        this.messageMail = '';
        control = true;
      }
    } else this.messageMail = 'Incorrect exemple : abc@abc.com';

    return control;
  }

  getFormValidationErrors(productForm: any) {
    Object.keys(productForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = productForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }
}
