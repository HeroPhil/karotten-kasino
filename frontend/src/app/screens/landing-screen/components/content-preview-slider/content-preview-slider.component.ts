import { Component, OnInit } from '@angular/core';

interface GameInformation {
  name: string,
  image: string,
  link?: string
}

@Component({
  selector: 'app-landing-screen-content-preview-slider',
  templateUrl: './content-preview-slider.component.html',
  styleUrls: ['./content-preview-slider.component.css']
})
export class ContentPreviewSliderComponent {
  games: GameInformation[] = [{ name: "Der Preis ist NICE", image: "priceIsNice.png", link: "/lobby" }, { name: "Coming Soon", image: "comingSoon.png" }];

  constructor() {}

}
