import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';


@Component({
  selector: 'landingScreen-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Games",
        icon: PrimeIcons.COMPASS,
      },
      {
        label: "Scoreboard",
        icon: PrimeIcons.BARS,
      },
      {
        label: "Contact",
        icon: PrimeIcons.PHONE,
      }
    ];
  }


}
