import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Stand } from '../stand';
import { StandService } from '../stand.service';

@Component({
  selector: 'app-stand-detail',
  templateUrl: './stand-detail.component.html',
  styleUrls: ['./stand-detail.component.css']
})
export class StandDetailComponent implements OnInit {

  @Input() stand: Stand;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private standService: StandService
  ) { }

  ngOnInit(): void {
    this.getStand();
  }

  getStand(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.standService.getStand(id)
      .subscribe(stand => this.stand = stand);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.standService.updateStand(this.stand)
      .subscribe(() => this.goBack());
  }
}
