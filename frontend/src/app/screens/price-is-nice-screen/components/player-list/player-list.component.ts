import { Component, OnInit } from '@angular/core';
import { PriceIsNiceService, PlayerListEntry } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  constructor(private priceIsNiceService: PriceIsNiceService) { }

  players: PlayerListEntry[] = [];
  

  ngOnInit(): void {
    this.priceIsNiceService.players.subscribe(players => {
      this.players = players;
    });
  }

}
