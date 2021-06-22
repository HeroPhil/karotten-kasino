import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'babo-result',
  templateUrl: './babo-result.component.html',
  styleUrls: ['./babo-result.component.css']
})
export class BaboResultComponent implements OnInit {

  constructor(private lobbyService: LobbyService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.lobbyService.closeRound();
  }

}
