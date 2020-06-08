import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { StandService } from '../stand.service';

class MockStandService {
  getStands() {
    return of([]);
  }
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockStandService: StandService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: StandService, useValue: new MockStandService()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    
    mockStandService = TestBed.inject(StandService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getStands() should fetch stands', () => {
    spyOn(component, 'getStands').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.getStands).toHaveBeenCalled();
  });
});
