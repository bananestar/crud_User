import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../users/models/Users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL = 'http://localhost:3000/users';

  constructor(private _httpClient: HttpClient) {}

  getAllUser() {
    return this._httpClient.get<Users>(this.URL);
  }

  getUser(id: number) {
    return this._httpClient.get(`${this.URL}/${id}`);
  }

  setUser(body: any) {
    this._httpClient.post<Users>(this.URL, body).subscribe({
      next: (data) => {
        console.log('set User : ' + data.firstName);
      },
      error: (error) => {
        console.warn('error ' + error);
      },
    });
  }

  removeUser(id: number) {
    this._httpClient.delete(`${this.URL}/${id}`).subscribe({
      next: (data) => {
        console.warn(`delete user ${id} :${data}`);
      },
      error: (error) => {
        console.warn('error ' + error);
      },
    });
  }

  updateUser(id: number, body: any) {
    this._httpClient.put(`${this.URL}/${id}`, body).subscribe({
      next: (data) => {
        console.log(`update user ${id} :${data}`);
      },
      error: (error) => {
        console.warn('error ' + error);
      },
    });
  }
}
