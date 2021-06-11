import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  joinCallback: (() => any) | undefined = undefined;

  constructor(private socket: Socket) {
    this.socket.on("joinLobbyAkw", () => {
      if (this.joinCallback != undefined) {
        this.joinCallback();
        this.joinCallback = undefined;
      }
    });  
   }

  joinLobby(lobbyCode: string, callback: () => any) {
    this.socket.emit("joinLobby", lobbyCode);
    this.joinCallback = callback;
  }

  getPlayers() {
    this.socket.emit("getPlayers");
  }

  players = this.socket.fromEvent<string[]>("playerList");


}
