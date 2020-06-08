import { Component, OnInit } from '@angular/core';

import { Stand } from '../stand';
import { StandService } from '../stand.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stands: Stand[];

  constructor(
    private standService: StandService
  ) { }

  ngOnInit(): void {
    this.getStands();
  }

  getStands(): void {
    this.standService.getStands()
      .subscribe(stands => this.stands = stands.slice(0, 4));
  }

}
