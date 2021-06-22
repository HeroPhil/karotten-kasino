import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-price-is-nice-screen',
  templateUrl: './price-is-nice-screen.component.html',
  styleUrls: ['./price-is-nice-screen.component.css']
})
export class PriceIsNiceScreenComponent implements OnInit {

  lobbyStatus = 0;
  isBabo = false;

  constructor(private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.lobbyService.lobbyStatus.subscribe((value) => this.lobbyStatus = value);
    this.lobbyService.isBabo.subscribe((value) => this.isBabo = value);
  }

}
