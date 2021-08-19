import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-screen-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  openGithub(): void {
  window.open('https://github.com/HeroPhil/karotten-kasino', '_blank');
  }

}
