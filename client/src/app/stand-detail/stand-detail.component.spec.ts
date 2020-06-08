import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StandDetailComponent } from './stand-detail.component';
import { StandService } from '../stand.service';
import { Stand } from '../stand';

class MockStandService {
  constructor() {}

  getStands() {
    return of([]);
  }

  getStand(id: number) {
    return of({Id: '11', Name: 'Star Platinum'});
  }

  updateStand() {
    return of({});
  }

  searchStands() {
    return of([]);
  }
};

const locationStub = {
  back: jasmine.createSpy('back')
};

describe('StandDetailComponent', () => {
  let component: StandDetailComponent;
  let fixture: ComponentFixture<StandDetailComponent>;

  let mockRoute;
  let mockStandService;
  let location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandDetailComponent ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatCheckboxModule,
        FlexLayoutModule,
      ],
      providers: [
        {
          provide: StandService, useValue: new MockStandService()
        },
        {
          provide: Location, useValue: locationStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStandService = TestBed.inject(StandService);
    mockRoute = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call getStand()', () => {
    let standServiceSpy = spyOn(mockStandService, 'getStand').and.callThrough();
    let componentSpy = spyOn(component, 'ngOnInit').and.callThrough();

    expect(standServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    component.ngOnInit();
    fixture.detectChanges();

    expect(standServiceSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
  });

  it('getStand() should call on StandService', () => {
    const expectedStand = {
      Id: 11, 
      Name: 'Star Platinum',
      User: 'Jotaro Kujo',
      MainColour: '#80080',
      FirstAppearance: new Date('1989-10-09'),
      LongRange: false,
      ImageUrl: ''
    };

    let standServiceSpy = spyOn(mockStandService, 'getStand').and.returnValue(of(expectedStand as Stand));

    expect(standServiceSpy).not.toHaveBeenCalled();

    component.ngOnInit();
    fixture.detectChanges();

    expect(standServiceSpy).toHaveBeenCalled();
    expect(component.stand).toEqual(expectedStand);
  });

  it('save() should call goBack()', () => {
    let componentSaveSpy = spyOn(component, 'save').and.callThrough();
    let componentGoBackSpy = spyOn(component, 'goBack');

    expect(componentSaveSpy).not.toHaveBeenCalled();
    expect(componentGoBackSpy).not.toHaveBeenCalled();

    component.save()
    fixture.detectChanges();

    expect(componentGoBackSpy).toHaveBeenCalled();
  });

  it('goBack() should return to the previous page', () => {
    const location = fixture.debugElement.injector.get(Location);
    // let locationServiceSpy = spyOn(location, 'back');
    // let componentGoBackSpy = spyOn(component, 'goBack');

    // expect(locationServiceSpy).not.toHaveBeenCalled();
    // expect(componentGoBackSpy).not.toHaveBeenCalled();

    component.goBack();
    fixture.detectChanges();

    expect(location.back).toHaveBeenCalled();
  });
});
