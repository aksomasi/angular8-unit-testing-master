/*
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

      return {fixture, component, profileService, dataService};
    }

    it('should create', () => {
      // tslint:disable-next-line:no-shadowed-variable
      const {component} = setup();
      expect(component).toBeTruthy();
    });

    it('should ngOnit',  async(() =>  {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService, dataService} = setup();

      const x = {
        switchProfile: false, userId: '10015QA4LPOC', ecpdId: '8216', locationCode: '987612345', associatedCompanies:
        // tslint:disable-next-line:max-line-length
          '[{"ecpdId":"8297","companyName":"529630228-136781724","subscriberOid":"529630232"},{"ecpdId":"8216","companyName":"54961899-97013236","subscriberOid":"54961903"}]'
      };
      spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(x);
      spyOn(dataService, 'getLinksetProfilesList').and.returnValue(x.associatedCompanies);

      const globalEcpId = dataService.getGlobalMbtVariables()['ecpdId'];
      component.dataSource = new MatTableDataSource<AssociatedCompany>(dataService.getLinksetProfilesList());
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
    //  component.ngOnInit();

    //  fixture.detectChanges();

      expect(component.globalEcpId).toBe(globalEcpId);

    }));

    /!*   it('should get users', async(() => {
         const {fixture, component, profileService, dataService} = setup();
         component.ngOnInit();
         const x = {switchProfile: false, userId: '10015QA4LPOC', ecpdId: '8216', locationCode: '987612345'};
         spyOn(dataService, 'getGlobalMbtVariables').and.returnValue(x);
         const globalEcpId = dataService.getGlobalMbtVariables()['ecpdId'];
         expect(component.globalEcpId).toBe(globalEcpId);

         profileService.searchProfile.subscribe(users => {
           fixture.detectChanges();
           expect(users).toBe(undefined);
         });
       }));*!/
  });
});
*/
