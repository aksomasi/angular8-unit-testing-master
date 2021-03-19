import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss']
})
export class ProfileSearchComponent implements OnInit {
  searchText = '';
  searchMessage = '';
  isShowOrange = false;
  isActive = true;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.searchMessage.subscribe(val => {
      this.searchMessage = val;
      this.isShowOrange =
        this.searchMessage === 'No results found.' ? true : false;
    });
  }

  closeSearch() {
    this.isActive = true;
    this.searchText = '';
    this.profileService.searchProfile.next(this.searchText);
  }

  performSearch() {
    this.isActive = false;
    this.profileService.searchProfile.next(this.searchText);
  }

  searchMsg() {
    if (this.searchText.length === 1 || this.searchText.length === 0) {
      this.searchMessage =
        'To start searching, please input at least 2 characters.';
      this.isShowOrange = false;
    } else {
      this.searchMessage = '';
    }
  }
}
