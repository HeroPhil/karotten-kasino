import { Component, OnInit } from '@angular/core';
import { GuessResult, LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'guess-result',
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.css']
})
export class GuessResultComponent implements OnInit {

  cols: any[] = [];
  results: GuessResult[] = [];

  constructor(private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.lobbyService.guessResults.subscribe((results) => {
      this.results = results;
    });

    this.cols = [
      { field: 'displayName', header: 'Spieler' },
      { field: 'guessValue', header: 'Münzen' },
    ];

  }




}
