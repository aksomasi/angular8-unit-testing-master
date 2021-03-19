import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ProfileService} from '../profile.service';
import {DataService} from '../data.service';


@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent  implements OnInit{
  pageCount: any = [10, 30, 60, 100];
  isTable2 = false;
  isTable3 = false;
  splittedData = new Array<AssociatedCompany[]>(3);
  selection: string;
  searchPlaceholder: string;
  dataSource = new MatTableDataSource();
  profileList: any;
  public showSearchIconOn5gException = false;
  searchText = '';
  searchMessage = '';
  selectedProfile;
  isActive: boolean;
  isShowOrange = false;
  public linksetProfileResponse: any;
  dropdownValues = [10, 30, 60, 100];
  isDropdownOpen = false;
  selectedFilter = 10;
  activePage = 1;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private profileService: ProfileService, public dataService: DataService) {
    this.isActive = true;
    this.searchPlaceholder = 'Search for ECPD';
  }
  globalEcpId: any;
  ngOnInit(): void {
    this.globalEcpId = this.dataService.getGlobalMbtVariables()['ecpdId'];
    this.profileService.searchProfile.subscribe((searchValue) => {
      if ((searchValue !== undefined && searchValue.length > 1) || searchValue === '') {
        this.searchText = searchValue;
        this.applyFilter(searchValue);
      }
    });
    this.defaultSort();
    this.defineFilter();
  }

  defaultSort() {
    this.sort = new MatSort();
    this.sort.active = 'position';
    this.sort.direction = 'asc';
  }

  defineFilter() {
    const list = this.dataService.getLinksetProfilesList();
    // const list =  this.tempData();
    if(list) {
      this.dataSource = new MatTableDataSource<AssociatedCompany>(list);
      if(!this.sort) {
        this.defaultSort();
      }
      this.dataSource.sortData(this.dataSource.data, this.sort);
      this.profileList = this.dataSource.filteredData.slice(
        (this.activePage - 1) * this.selectedFilter,
        this.activePage * this.selectedFilter
      );
      this.selectedProfile = this.dataSource.data.filter((profile: AssociatedCompany) => profile.ecpdId === this.globalEcpId)[0];

      this.profileService.selectedProfile.next(this.selectedProfile);
      // tslint:disable-next-line:max-line-length
      this.profileList = [this.selectedProfile, ...this.dataSource.data.filter((user: AssociatedCompany) => user.ecpdId !== this.selectedProfile.ecpdId)];
      this.appendData();
    }

  }

  applySort(sort: MatSort) {
    this.sort = sort;
    const data = this.searchText === '' ? this.dataSource.data : this.dataSource.filteredData;
    const sortDatasource = new MatTableDataSource<any>(data);
    sortDatasource.sortData(data, this.sort);
    const page = this.activePage ? this.activePage : 1;
    this.profileList = sortDatasource.filteredData.slice(
      (page - 1) * this.selectedFilter,
      page * this.selectedFilter
    );
    const selectedUser = this.profileList.filter(user => user.ecpdId === this.selectedProfile.ecpdId);
    const selectedFilterUser = data.filter((user: AssociatedCompany) => user.ecpdId === this.selectedProfile.ecpdId);

    if (this.activePage === 1) {
      if (this.searchText === '') {
        this.profileList = [this.selectedProfile, ...this.profileList.filter(user => user.ecpdId !== this.selectedProfile.ecpdId)];

      } else if (selectedUser.length > 0 || selectedFilterUser.length > 0) {
        this.profileList = [this.selectedProfile, ...this.profileList.filter(user => user.ecpdId !== this.selectedProfile.ecpdId)];
      }
    } else {
      this.profileList = this.profileList.filter(user => user.ecpdId !== this.selectedProfile.ecpdId);
    }
    this.appendData();
  }

  applyPagination(page: number) {
    this.activePage = page;

    if (page === 1 && this.searchText === '') {
      this.defineFilter();
    } else {
      const data = this.searchText === '' ? this.dataSource.data : this.dataSource.filteredData;

      this.profileList = data.slice(
        (page - 1) * this.selectedFilter
        ,
        page * this.selectedFilter
      );

      const selectedUser = this.profileList.filter(user => user.ecpdId === this.selectedProfile.ecpdId);
      if (selectedUser.length>0) {
        this.profileList = this.profileList.filter(user => user.ecpdId !== this.selectedProfile.ecpdId);
        if(this.profileList.length !== this.selectedFilter) {
          this.profileList = [this.selectedProfile, ...this.profileList.filter(user => user.ecpdId !== this.selectedProfile.ecpdId)];
        }

      }
      this.appendData();
    }

  }

  applyFilter(searchValue) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.activePage = 1;
    this.applySort(this.sort);
    if(searchValue.length>0) {
      this.isActive = false;
      this.searchText = searchValue;
    } else {
      this.isActive = true;
      this.searchText = '';
    }
    this.isShowOrange = this.dataSource.filteredData.length >= 1 ? false : true;
    this.searchMessage = this.dataSource.filteredData.length >= 1 ? '' : 'No results found.';
    this.profileService.searchMessage.next(this.searchMessage);
  }


  appendData() {
    this.splittedData = new Array<AssociatedCompany[]>(3);
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    if (this.profileList.length > 0) {
      switch (this.selectedFilter) {
        case 30:
          this.splittedData[0] = this.profileList.slice(0, 10);
          this.splittedData[1] = this.profileList.slice(10, 20);
          this.splittedData[2] = this.profileList.slice(20, 30);
          break;
        case 60:
          this.splittedData[0] = this.profileList.slice(0, 20);
          this.splittedData[1] = this.profileList.slice(20, 40);
          this.splittedData[2] = this.profileList.slice(40, 60);
          break;
        case 100:
          this.splittedData[0] = this.profileList.slice(0, 34);
          this.splittedData[1] = this.profileList.slice(34, 67);
          this.splittedData[2] = this.profileList.slice(67, 100);
          break;
        default:
          this.splittedData[0] = this.profileList.slice(0, 10);
          break;
      }

      if(this.splittedData[1])
      this.isTable2 = this.splittedData[1].length > 1 ? true : false;
      if(this.splittedData[2])
        this.isTable3 = this.splittedData[2].length > 1 ? true : false;
    }
  }

  toggleDropDown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectDropdownFilter = (selectedIndex) => {
    this.selectedFilter = this.dropdownValues[selectedIndex];
    this.toggleDropDown();

    this.applyPagination(1);
  }
}

export interface AssociatedCompany {
  ecpdId: string;
  companyName: string;
}
