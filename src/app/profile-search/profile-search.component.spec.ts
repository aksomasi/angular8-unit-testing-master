import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchComponent } from './profile-search.component';
import {ProfileGridComponent} from '../profile-grid/profile-grid.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSort, MatSortModule, MatTableDataSource, MatTableModule} from '@angular/material';
import {ProfileService} from '../profile.service';
import {AssociatedCompany} from '../profiles-list/profiles-list.component';

describe('ProfileSearchComponent', () => {
  let component: ProfileSearchComponent;
  let fixture: ComponentFixture<ProfileSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSearchComponent],
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
      const fixture: ComponentFixture<ProfileSearchComponent> = TestBed.createComponent(ProfileSearchComponent);
      const component: ProfileSearchComponent = fixture.componentInstance;
      const profileService: ProfileService = fixture.debugElement.injector.get(ProfileService);

      return {fixture, component, profileService};
    }

    it('should create', () => {
      // tslint:disable-next-line:no-shadowed-variable
      const {component} = setup();
      expect(component).toBeTruthy();
    });
    it('should ngOnit', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      profileService.searchMessage.next('No results found.');
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.isShowOrange).toEqual(true);
    }));
    it('should closeSearch', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      component.closeSearch();
      fixture.detectChanges();
      expect(component.isActive).toEqual(true);
      expect(component.searchText).toEqual('');
    }));
    it('should performSearch', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      component.performSearch();
      fixture.detectChanges();
      expect(component.isActive).toEqual(false);
    }));
    it('should searchMsg', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      component.searchText = '';
      component.searchMsg();
      expect(component.isShowOrange).toEqual(false);
    }));
  });
});
