import { Component, OnInit } from '@angular/core';
import { FakerService } from '../services/faker.service';
import { LoadingService } from '../services/loading.service';
import { UsersService } from '../services/users.service';
import { Users } from './models/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Users[]= [];
  loading$ = this.loader.loading$;
  constructor(
    public loader: LoadingService,
    private _UserService: UsersService,
    private _Faker: FakerService,
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    return this._UserService.getAllUser().subscribe((data)=>{
      //@ts-ignore
      this.users = data
      // console.log(this.users);
    })
  }

  removeUser(id:number){
    console.log('remove '+id);
    this._UserService.removeUser(id);
    window.location.reload()
  }

  viewUser(id:number){
    console.log('view '+id);
  }

  moreUser(){
    this._Faker.getMoreUser()
    window.location.reload()
  }
}
