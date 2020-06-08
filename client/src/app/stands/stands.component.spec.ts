import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

import { StandsComponent } from './stands.component';
import { StandService } from '../stand.service';
import { Stand } from '../stand';

class MockStandService {
    constructor() {}

    getStands() {
      return of([]);
    }

    addStand() {
      return of([]);
    }

    deleteStand() {
      return of([]);
    }
};

describe('StandsComponent', () => {
  let component: StandsComponent;
  let fixture: ComponentFixture<StandsComponent>;

  let mockStandService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandsComponent ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule,
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
    fixture = TestBed.createComponent(StandsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    mockStandService = TestBed.inject(StandService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test GET stands
  it('#getStands() should fetch stands', () => {
    const standServiceSpy = spyOn(mockStandService, 'getStands').and.callThrough();
    const componentSpy = spyOn(component, 'getStands').and.callThrough();

    expect(standServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    component.ngOnInit();
    fixture.detectChanges();

    expect(standServiceSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
  });

  // Test adding a new stand
  it('#add() should create a new stand', () => {
    const standServiceSpy = spyOn(mockStandService, 'addStand').and.callThrough();
    const componentSpy = spyOn(component, 'add').and.callThrough();

    expect(standServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    component.stands = [];

    // Regular stand
    component.add('', 'Test', 'Test', '#FFFFFF', false);

    // Regular stand with colour word to hex conversion
    component.add('', 'Test', 'Test', 'black', false);

    // Stand with missing required property
    component.add('', null, 'Null', '#FFFFFF', false);

    fixture.detectChanges();

    expect(standServiceSpy).toHaveBeenCalledTimes(2);
    expect(componentSpy).toHaveBeenCalledTimes(3);
  });


   // Test deleting a stand by 
   it('#delete() should delete a stand', () => {
    const standServiceSpy = spyOn(mockStandService, 'deleteStand').and.callThrough();
    const componentSpy = spyOn(component, 'delete').and.callThrough();

    expect(standServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    const standToDelete = {
      Id: 11,
      Name: 'Star Platinum',
      User: 'Jotaro Kujo',
      MainColour: '#800080',
      FirstAppearance: new Date(1989, 10, 9),
      LongRange: false,
    };

    component.stands = [standToDelete as Stand];
    component.delete(standToDelete as Stand);

    fixture.detectChanges();

    expect(standServiceSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
  });

});
