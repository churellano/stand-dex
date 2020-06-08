import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { StandService } from './stand.service';
import { Stand } from './stand';

describe('StandService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let standService: StandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    standService = TestBed.inject(StandService);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(standService).toBeTruthy();
  });

  // Test GET all stands
  it('#getStands() should perform a GET request', () => {

      standService.getStands().subscribe();
      const req = httpTestingController.expectOne(standService['standsUrl']);
      expect(req.request.method).toEqual("GET");
  });

  // Test GET one stand
  it('#getStand() should perform a GET request based on id', () => {
    const Id = 11;
    standService.getStand(Id).subscribe();
    const req = httpTestingController.expectOne(standService['standsUrl'] + `/${Id}` );
    expect(req.request.method).toEqual('GET');
  });

  // Test ADD (POST) one stand
  it('#addStand() should perform a POST request', () => {
    const newStand = {
      Id: null,
      Name: 'UnitTestPost',
      User: 'UnitTestPost',
      MainColour: '#FFFFFF',
      FirstAppearance: new Date(),
      LongRange: false,
      ImageUrl: ''
    };

    standService.addStand(newStand as Stand).subscribe();

    const req = httpTestingController.expectOne(standService['standsUrl']);
    expect(req.request.method).toEqual('POST');
  });

  // Test UPDATE (PUT) one stand
  it('#updateStand() should perform a PUT request', () => {
    const updatedStand = {
      Id: 33,
      Name: 'UnitTestPut',
      User: 'UnitTestPut',
      MainColour: '#000000',
      FirstAppearance: new Date(2020, 5, 13),
      LongRange: false,
      ImageUrl: ''
    };

    standService.updateStand(updatedStand as Stand).subscribe();
    const req = httpTestingController.expectOne(standService['standsUrl'] + `/${updatedStand.Id}` );
    expect(req.request.method).toEqual('PUT');
  });

  // Test DELETE one stand
  it('#deleteStand() should return 200 OK', () => {
    const standToDelete = {
      Id: 11,
      Name: 'Star Platinum',
      User: 'Jotaro Kujo',
      MainColour: '#800080',
      FirstAppearance: new Date(1989, 10, 9),
      LongRange: false,
    };

    standService.deleteStand(standToDelete as Stand).subscribe(result => {
      expect(result.status).toEqual(200);
    });
    const req = httpTestingController.expectOne(standService['standsUrl'] + `/${standToDelete.Id}` );
    expect(req.request.method).toEqual('DELETE');
  });

  // Test SEARCH stands
  it('#searchStands() should perform a GET request based on a search term', () => {
    const searchTerm = 'x';
    const expectedStands = [
      { 
        Id: 14,
        Name: 'Gold Experience',
      },
      {
        Id: 18,
        Name: 'Sex Pistols'
      }
    ];

    standService.searchStands(searchTerm).subscribe(
      data => expect(data).toEqual(expectedStands as Stand[], 'expected stands'),
      fail
    );
    const req = httpTestingController.expectOne(standService['standsUrl'] + `/?name=${searchTerm}`);
    expect(req.request.method).toEqual('GET');
  });

  // Test SEARCH stands with a null search term
  it('#searchStands() with a null search term should return an empty array', () => {
    const searchTerm = null;
    const expectedStands = [];

    standService.searchStands(searchTerm).subscribe(
      data => expect(data).toEqual(expectedStands as Stand[], 'expected stands'),
      fail
    );
  });

  // Test SEARCH stands with no matches
  it('#searchStands() with no matches should return an empty array', () => {
    const searchTerm = '123456789';
    const expectedStands = [];

    standService.searchStands(searchTerm).subscribe(
      data => expect(data).toEqual(expectedStands as Stand[], 'expected stands'),
      fail
    );
    const req = httpTestingController.expectOne(standService['standsUrl'] + `/?name=${searchTerm}`);
    expect(req.request.method).toEqual('GET');
  });

});
