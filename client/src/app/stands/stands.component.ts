import { Component, OnInit } from '@angular/core';

import { colourNameToHex } from '../colour';

import { StandService } from '../stand.service';
import { Stand } from '../stand';

@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.css']
})
export class StandsComponent implements OnInit {

  stands: Stand[];

  constructor(
    private standService: StandService,
  ) { }

  ngOnInit(): void {
    this.getStands();
  }

  getStands(): void {
    this.standService.getStands()
      .subscribe((data: Stand[]) => {
        this.stands = data;
      });
  }

  add(standImageUrl: string, standName: string, standUser: string, standMainColour: string, standLongRange: boolean): void {
    if ( !standName || !standUser || !standMainColour || standLongRange == null ) {
      return;
    }

    // Convert colour word to hex before creating new stand
    const hexColourCodeRegExp = /^#([a-fA-F0-9]{6})$/i;
    if (!hexColourCodeRegExp.test(standMainColour)) {
      standMainColour = colourNameToHex(standMainColour);
    }

    standImageUrl = standImageUrl.trim();
    standName = standName.trim();
    standUser = standUser.trim();
    standMainColour = standMainColour.trim();

    var newStand = {
      Name: standName,
      User: standUser,
      MainColour: standMainColour,
      FirstAppearance: new Date(),
      LongRange: standLongRange,
      ImageUrl: standImageUrl
    };

    this.standService.addStand(newStand as Stand)
      .subscribe(stand => {
        this.stands.push(stand)
      });
  }

  delete(stand: Stand): void {
    this.stands = this.stands.filter(s => s !== stand);
    this.standService.deleteStand(stand).subscribe();
  }

}
