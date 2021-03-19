import {AssociatedCompany, ProfilesListComponent} from '../profiles-list/profiles-list.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSort, MatSortModule, MatTableDataSource, MatTableModule} from '@angular/material';
import {ProfileService} from '../profile.service';
import {ProfileGridComponent} from './profile-grid.component';

describe('ProfileGridComponent', () => {
  let component: ProfileGridComponent;
  let fixture: ComponentFixture<ProfileGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileGridComponent],
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
      const fixture: ComponentFixture<ProfileGridComponent> = TestBed.createComponent(ProfileGridComponent);
      const component: ProfileGridComponent = fixture.componentInstance;
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
      const associatedCompaniesList = [{ecpdId: '8216', companyName: '529630228-136781724', subscriberOid: '529630232'}, {ecpdId: '8292', companyName: '529630228-13688781724', subscriberOid: '529630232'}];
      component.dataSource = new MatTableDataSource<AssociatedCompany>(associatedCompaniesList);
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      profileService.selectedProfile.next({ecpdId: '8216', companyName: '529630228-136781724'})
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.currentSelection).toEqual('8216');
    }));


    it('should applyEllipses', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      const value = component.applyEllipsis('Verizon is one of the largest communication');
      const textWithEllipse = 'Verizon is one of the large...';
      const textWithOutEllipse = 'Verizon is one of the large...';
      expect(value).toEqual(textWithEllipse);
      expect(component.applyEllipsis('Verizon is one of the')).toEqual('Verizon is one of the');
    }));
    it('should getToolTip', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      const value = component.getToolTip('Verizon is one of the largest communication');
      expect(value).toEqual('Verizon is one of the largest communication');
      expect(component.getToolTip('Verizon is one of the')).toEqual('');
    }));
    it('should profileSort', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      const associatedCompaniesList = [{ecpdId: '8216', companyName: '529630228-136781724', subscriberOid: '529630232'}, {ecpdId: '8292', companyName: '529630228-13688781724', subscriberOid: '529630232'}];
      component.dataSource = new MatTableDataSource<AssociatedCompany>(associatedCompaniesList);
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      component.isIcons = true;
      component.profileSort('ecpdId');
      expect(component.profileSortOrder).toBe(true);
      expect(component.nameSortOrder).toBe(false);
      expect(component.sort.active).toEqual('ecpdId');
      component.profileSort('companyName');
      expect(component.nameSortOrder).toBe(true);
      expect(component.profileSortOrder).toBe(false);
      expect(component.sort.active).toEqual('companyName');
    }));
    it('should profileSort Asc', async(() => {
      // tslint:disable-next-line:no-shadowed-variable
      const {fixture, component, profileService} = setup();
      const associatedCompaniesList = [{ecpdId: '8216', companyName: '529630228-136781724', subscriberOid: '529630232'}, {ecpdId: '8292', companyName: '529630228-13688781724', subscriberOid: '529630232'}];
      component.dataSource = new MatTableDataSource<AssociatedCompany>(associatedCompaniesList);
      component.sort = new MatSort();
      component.dataSource.sort = component.sort;
      component.isIcons = true;
      component.profileSortOrder = true;
      component.profileSort('ecpdId');
      expect(component.sort.active).toEqual('ecpdId');
      component.nameSortOrder = true;
      component.profileSort('companyName');
      expect(component.sort.active).toEqual('companyName');
    }));

  });
});
