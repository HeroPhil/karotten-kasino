import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landingScreen-content-preview-slider',
  templateUrl: './content-preview-slider.component.html',
  styleUrls: ['./content-preview-slider.component.css']
})
export class ContentPreviewSliderComponent implements OnInit {

  games = [{name: "Der Preis ist NICE",image: "priceIsNice.png"}, {name: "Coming Soon", image: "comingSoon.png"}];

  constructor() { }

  ngOnInit(): void {
  }

}
