import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { StandSearchComponent } from './stand-search.component';
import { StandService } from '../stand.service';

class MockStandService {
  constructor() {}

  getStands() {
    return of([]);
  }

  searchStands() {
    return of([]);
  }
};

describe('StandSearchComponent', () => {
  let component: StandSearchComponent;
  let fixture: ComponentFixture<StandSearchComponent>;

  let mockStandService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandSearchComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatIconModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(StandSearchComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    
    mockStandService = TestBed.inject(StandService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should call searchStands()', () => {
    const componentSpy = spyOn(component, 'ngOnInit').and.callThrough();

    const standServiceSpy = spyOn(mockStandService, 'searchStands');

    expect(componentSpy).not.toHaveBeenCalled();
    expect(standServiceSpy).not.toHaveBeenCalled();

    component.ngOnInit();
    fixture.detectChanges();

    expect(componentSpy).toHaveBeenCalled();
    expect(standServiceSpy).toHaveBeenCalled();

  });

  it('search() should add strings to searchTerms', () => {
    spyOn(component, 'search').and.callThrough();
    const searchTermsSpy = spyOn(component['searchTerms'], 'next').and.callThrough();
    const searchString = 'test';

    component.search(searchString);
    fixture.detectChanges();

    expect(searchTermsSpy).toHaveBeenCalled();

  });
});
