import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssociatedCompany, ProfilesListComponent} from './profiles-list.component';
import {UserService} from '../user/user.service';
import {ProfileService} from '../profile.service';
import {DataService} from '../data.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  MatFormFieldModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule, MatSelectModule, MatSort,
  MatSortModule, MatTableDataSource,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

describe('ProfilesListComponent', () => {
  let component: ProfilesListComponent;
  let fixture: ComponentFixture<ProfilesListComponent>;
  let globalEcpId;
  let associatedCompaniesList;
  let mockData;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesListComponent],
      imports: [
        HttpClientTestingModule,
        MatSortModule,
        MatTableModule,
        MatSortModule,
      ]
    })
      .compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture: ComponentFixture<ProfilesListComponent> = TestBed.createComponent(ProfilesListComponent);
      const component: ProfilesListComponent = fixture.componentInstance;
      const profileService: ProfileService = fixture.debugElement.injector.get(ProfileService);
      const dataService: DataService = fixture.debugElement.injector.get(DataService);
      associatedCompaniesList = [{ecpdId: '8216', companyName: '529630228-136781724'}, {ecpdId: '8292', companyName: '529630228-13688781724'}];
      mockData = {
        switchProfile: false, userId: '10015QA4LPOC', ecpdId: '8216', locationCode: '987612345', associatedCompanies: associatedCompaniesList };
      component.dataSource = new MatTableDataSource<AssociatedCompany>(dataService.getLinksetProfilesList());
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      return {fixture, component, profileService, dataService};
    }

    it('should create', () => {
      // tslint:disable-next-line:no-shadowed-variable
      const {component} = setup();
      expect(component).toBeTruthy();
    });

    it('should ngOnit', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(mockData);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(mockData.associatedCompanies);
      globalEcpId = dataService.getGlobalMbtVariables()['ecpdId'];
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.globalEcpId).toBe(globalEcpId);
    }));
    it('should search', async(() => {
      const {fixture, component, profileService, dataService} = setup();
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(mockData);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(mockData.associatedCompanies);
      globalEcpId = dataService.getGlobalMbtVariables()['ecpdId'];
      component.applyFilter('82');
      expect(component.activePage).toBe(1);
      component.applyFilter('');
      expect(component.isActive).toBeTruthy();
    }));
    it('should appendData', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      component.profileList = [{ecpdId: '8216', companyName: '529630228-136781724'}, {ecpdId: '8292', companyName: '529630228-13688781724'}];
      component.selectedProfile = {ecpdId: '8216', companyName: '529630228-136781724'};
      component.dataSource.sort = component.sort;
      component.selectedFilter = 30;
      component.appendData();
      expect(component.splittedData[0]).toEqual(component.profileList);
      component.selectedFilter = 60;
      expect(component.splittedData[0]).toEqual(component.profileList);
      component.appendData();
      component.selectedFilter = 100;
      component.appendData();
      expect(component.splittedData[0]).toEqual(component.profileList);

    }));

    it('should toggleDropDown', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      component.isDropdownOpen = true;
      component.toggleDropDown();
      expect(component.isDropdownOpen).toBeFalsy();

    }));
    it('should selectDropdownFilter', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(mockData);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(mockData.associatedCompanies);
      component.dataSource = new MatTableDataSource<AssociatedCompany>(dataService.getLinksetProfilesList());
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      fixture.detectChanges();
      component.selectDropdownFilter(30);
      expect(component.isDropdownOpen).toBeTruthy();

    }));
    it('should applyPagination', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(mockData);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(mockData.associatedCompanies);
      component.dataSource = new MatTableDataSource<AssociatedCompany>(dataService.getLinksetProfilesList());
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      fixture.detectChanges();
      component.selectedProfile = {ecpdId: '8216', companyName: '529630228-136781724'};
      component.searchText = '8';
      component.applyPagination(1);
      expect(component.profileList).toEqual(associatedCompaniesList);
    }));
    it('should applyFilter with No results', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(mockData);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(mockData.associatedCompanies);
      globalEcpId = dataService.getGlobalMbtVariables()['ecpdId'];
      component.dataSource = new MatTableDataSource<AssociatedCompany>(dataService.getLinksetProfilesList());
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      fixture.detectChanges();
      component.applyFilter('verizon');
      expect(component.searchMessage).toEqual('No results found.');
      expect(component.isShowOrange).toEqual(true);

    }));
    it('should applySort', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(mockData);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(mockData.associatedCompanies);
      globalEcpId = dataService.getGlobalMbtVariables()['ecpdId'];
      component.dataSource = new MatTableDataSource<AssociatedCompany>(dataService.getLinksetProfilesList());
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      fixture.detectChanges();
      component.activePage = undefined;
      component.selectedProfile = {ecpdId: '8216', companyName: '529630228-136781724'};
      component.applySort(component.sort);
    }));
  });
});
