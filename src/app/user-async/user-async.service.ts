import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAsyncService {
  user = { name: 'dk' };
  getUserDetails() {
    // Create an observables.
    const userObservables = Observable.create(
      (observer: Observer<{ name: string }>) => {
        setTimeout(() => {
          observer.next(this.user);
        }, 2000);
      }
    );
    return userObservables;
  }
}
