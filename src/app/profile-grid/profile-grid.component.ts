import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {AssociatedCompany} from '../profiles-list/profiles-list.component';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-grid',
  templateUrl: './profile-grid.component.html',
  styleUrls: ['./profile-grid.component.scss']
})
export class ProfileGridComponent implements OnInit {

  @Input() dataSource:any;
  displayedColumns = ["ecpdId", "companyName"];
  @Input() isTable2: boolean;
  @Input() isTable3: boolean[];
  @Input() isIcons;

  @Output() emitSort: EventEmitter<MatSort> = new EventEmitter<MatSort>();
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  profileSortOrder = false;
  nameSortOrder = false;

  selectedProfile: AssociatedCompany;
  constructor(
    private profileService: ProfileService,
  ) {}

  currentSelection;
  selcetion: number;
  ngOnInit(): void {
    this.profileService.selectedProfile.subscribe(val => {
      this.currentSelection = val.ecpdId;
    });
  }

  applyEllipsis(value) {
    if (value.length >= 30) {
      return value.slice(0, 27) + "...";
    }
    return value;
  }

  getToolTip(val) {
    if (val.length <= 27) {
      return "";
    }
    return val;
  }

  changeSelection(value) {
    this.profileService.selectedProfile.next(value);
  }
  profileSort(active) {
    if (this.isIcons) {
      if (active === "ecpdId") {
        this.nameSortOrder = false;
        this.sort.direction = this.profileSortOrder ? "asc" : "desc";
        this.profileSortOrder = !this.profileSortOrder;
      }
      if (active === "companyName") {
        this.profileSortOrder = false;
        this.sort.direction = this.nameSortOrder ? "asc" : "desc";
        this.nameSortOrder = !this.nameSortOrder;
      }
      this.sort.active = active;
      this.emitSort.emit(this.sort);
    }
  }

}
