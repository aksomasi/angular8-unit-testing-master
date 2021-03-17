import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user = {
    name: 'dk'
  };

  getUser() {
    return this.user;
  }
}
