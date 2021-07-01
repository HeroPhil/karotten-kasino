import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'app-price-is-nice-screen',
  templateUrl: './price-is-nice-screen.component.html',
  styleUrls: ['./price-is-nice-screen.component.css'],
  providers: [MessageService]
})
export class PriceIsNiceScreenComponent implements OnInit {

  lobbyStatus = 0;
  isBabo = false;

  constructor(private lobbyService: LobbyService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.lobbyService.lobbyStatus.subscribe((value) => this.lobbyStatus = value);
    this.lobbyService.isBabo.subscribe((value) => {
      this.isBabo = value;
      if (value) {
        this.messageService.add({ summary: "Do bis jetz aan de Maat!", detail: "Lass dir was gutes einfallen", severity: "warn" , key: "tr-toast"});
      }
    });
    this.lobbyService.playerJoined.subscribe((playerName) => this.messageService.add({ summary: playerName + " es beijetrodde", severity: "success" , key: "bc-toast"}));
    this.lobbyService.playerYeeted.subscribe((playerName) => this.messageService.add({ summary: playerName + " hätt de runde verloße", severity: "error", key: "bc-toast"}));
  }

}
