import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Stand } from '../stand';
import { StandService } from '../stand.service';

@Component({
  selector: 'app-stand-search',
  templateUrl: './stand-search.component.html',
  styleUrls: [ './stand-search.component.css' ],
})

export class StandSearchComponent implements OnInit {
  
  stands$: Observable<Stand[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private standService: StandService,
    private router: Router
  ) {
    // Taken from https://github.com/angular/angular/issues/13831#issuecomment-319634921
    // This allows travel between sibling routes when navigating via search results
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
   }
  }

  ngOnInit(): void {
    this.stands$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        return this.standService.searchStands(term)
      })
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
}