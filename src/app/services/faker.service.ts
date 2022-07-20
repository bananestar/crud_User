import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root',
})
export class FakerService {
  constructor(private _UserService: UsersService) {}

  getMoreUser() {
    const fname: string = faker.name.firstName();
    const lname: string = faker.name.lastName();

    const mail: string = `${fname}.${lname}@gmail.com`;

    const body: any = {
      firstName: fname,
      lastName: lname,
      mail: mail,
    };

    this._UserService.setUser(body);
  }
}
