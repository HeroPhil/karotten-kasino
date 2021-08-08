import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-landing-screen-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items!: MenuItem[];
  activeItem!: MenuItem;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Home",
        icon: PrimeIcons.HOME,
        routerLink: "/"
      },
      {
        label: "Games",
        icon: PrimeIcons.COMPASS,
        routerLink: "/game-overview"
      },
      {
        label: "Contact",
        icon: PrimeIcons.PHONE,
        routerLink: "/contact"
      }
    ];

    this.activeItem = this.items[0];
  }


}
