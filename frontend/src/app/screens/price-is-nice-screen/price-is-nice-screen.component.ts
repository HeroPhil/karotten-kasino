import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'app-price-is-nice-screen',
  templateUrl: './price-is-nice-screen.component.html',
  styleUrls: ['./price-is-nice-screen.component.css'],
  providers: [MessageService]
})
export class PriceIsNiceScreenComponent implements OnInit {

  lobbyStatus = 0;
  isBabo = false;
  lobbyCode: string|undefined;
  display = true;

  constructor(private priceIsNiceService: PriceIsNiceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.priceIsNiceService.lobbyStatus.subscribe((value) => this.lobbyStatus = value);
    this.priceIsNiceService.isBabo.subscribe((value) => {
      this.isBabo = value;
      if (value) {
        this.messageService.add({ summary: "Du bist jetzt Babo!", detail: "Lass dir was gutes einfallen!", severity: "warn" , key: "tr-toast"});
      }
    });
    this.priceIsNiceService.playerJoined.subscribe((playerName) => this.messageService.add({ summary: playerName + " ist der Lobby beigetreten", severity: "success" , key: "bc-toast"}));
    this.priceIsNiceService.playerYeeted.subscribe((playerName) => this.messageService.add({ summary: playerName + " hat die Lobby verlassen", severity: "error", key: "bc-toast"}));
    this.lobbyCode = this.priceIsNiceService.lobbyCode;
  }

}
