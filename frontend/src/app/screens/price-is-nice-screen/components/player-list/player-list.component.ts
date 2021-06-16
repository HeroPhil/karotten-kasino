import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  constructor(private lobbyService: LobbyService) { }

  players: string[] = [];

  ngOnInit(): void {
    this.lobbyService.players.subscribe(players => {
      console.log("updating players: " + players);
      this.players = players
    });
  }

}
