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

  joinLobby(lobbyCode: string, displayName: string, callback: () => any) {
    this.socket.emit("joinLobby", { lobbyCode: lobbyCode, displayName: displayName });
    this.joinCallback = callback;
  }

  players = this.socket.fromEvent<string[]>("playerList");


}
