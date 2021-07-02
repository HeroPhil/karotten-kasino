import { Component, OnInit } from '@angular/core';
import { GuessInformation, LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'guess-information',
  templateUrl: './guess-information.component.html',
  styleUrls: ['./guess-information.component.css']
})
export class GuessInformationComponent implements OnInit {

  guessInformation: GuessInformation = {
    name: "Rätselhaftes Produkt",
    price: "???",
  };

  constructor(private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.lobbyService.guessInformation.subscribe((data) => {
      this.guessInformation = data;
    });
  }

}
