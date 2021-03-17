import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AssociatedCompany} from './profiles-list/profiles-list.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  selectedProfile: BehaviorSubject<AssociatedCompany> = new BehaviorSubject(undefined);
  searchProfile: BehaviorSubject<string> = new BehaviorSubject(undefined);
  searchMessage: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {}

 }
