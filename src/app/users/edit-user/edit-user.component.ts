import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../models/Users';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user: Partial<Users> = {};

  formGroup: FormGroup = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    mail: new FormControl(''),
  });

  messageFname: string = '';
  messageLname: string = '';
  messageMail: string = '';

  constructor(
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _UserService: UsersService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._UserService
      .getUser(this._ActivatedRoute.snapshot.params['id'])
      .subscribe({
        next: (data) => {
          console.log(data);
          this.user = data;
        },
        error: (error) => {
          if (error.status === 404) {
            this._Router.navigate(['/404']);
          }
        },
      });

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

    let id = Number(this.user.id)
    
    this._UserService.updateUser(id, body);
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
}
