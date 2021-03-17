import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PaginatorComponent} from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: []
    })
      .compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture: ComponentFixture<PaginatorComponent> = TestBed.createComponent(PaginatorComponent);
      const component: PaginatorComponent = fixture.componentInstance;
      return {fixture, component};
    }

    it('should create', () => {
      const {component} = setup();
      expect(component).toBeTruthy();
    });
    it('should ngOnIt', () => {
      const {component} = setup();
      component.recordCount = 10;
      component.pageSize = 2;
      component.startRange = 5;
      const pageCount = Math.ceil(component.recordCount / component.pageSize);
      component.ngOnChanges();
      expect(component.pageCount).toBe(pageCount);
      expect(component.startRange).toBe(1);
    });

    it('should next', () => {
      const {component} = setup();
      component.activePage = 1;
      component.pages = [1];
      component.shiftSize = 2;
      component.shiftSize = 1;
      component.next(new Event('click'));
      expect(component.isPageActive(2)).toBeTruthy();
    });

    it('should setPage with previou', () => {
      const {component} = setup();
      component.activePage = 1;
      component.pages = [1, 2, 3, 4];
      component.shiftSize = 3;
      component.startRange = 5;
      component.pageCount = 12;
      component.next(new Event('click'));
      expect(component.pages).toEqual([1, 2, 3, 4]);

    });
    it('should previous', () => {
      const {component} = setup();
      component.activePage = 1;
      component.pages = [1];
      component.shiftSize = 2;
      component.shiftSize = 1;
      component.previous(new Event('click'));
      expect(component.isPageActive(2)).toBeFalsy();
    });
    it('should setPage with previous', () => {
      const {component} = setup();
      component.activePage = 1;
      component.pages = [1, 2, 3, 4];
      component.shiftSize = 3;
      component.startRange = 5;
      component.pageCount = 12;
      component.next(new Event('click'));
      expect(component.pages).toEqual([1, 2, 3, 4]);
    });
    it('should selectPage', () => {
      const {component} = setup();
      component.activePage = 2;
      component.selectPage(new Event('click'), 3);
      expect(component.activePage).toBe(3);
    });
    it('should isPageActive true', () => {
      const {component} = setup();
      component.activePage = 1;
      expect(component.isPageActive(1)).toBeTruthy();
    });
    it('should isPageActive false', () => {
      const {component} = setup();
      component.activePage = 2;
      expect(component.isPageActive(1)).toBeFalsy();
    });
    it('should hide true', () => {
      const {component} = setup();
      component.activePage = 1;
      expect(component.hide('previous')).toBeTruthy();
    });
    it('should hide false', () => {
      const {component} = setup();
      component.activePage = 1;
      expect(component.hide('next')).toBeFalsy();
    });
  });
});
