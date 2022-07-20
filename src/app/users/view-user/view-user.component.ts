import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../models/Users';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  user: Partial<Users> = {};

  constructor(
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _UserService: UsersService
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
  }
}
