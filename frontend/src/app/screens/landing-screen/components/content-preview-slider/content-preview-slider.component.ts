import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landingScreen-content-preview-slider',
  templateUrl: './content-preview-slider.component.html',
  styleUrls: ['./content-preview-slider.component.css']
})
export class ContentPreviewSliderComponent implements OnInit {

  games = ["Der Preis ist NICE", "Game2", "Game3"];

  constructor() { }

  ngOnInit(): void {
  }

}
