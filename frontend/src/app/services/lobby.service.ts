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

  players = this.socket.fromEvent<PlayerListEntry[]>("playerList");
  isBabo = this.socket.fromEvent<boolean>("youAreBabo");
  guessResults = this.socket.fromEvent<GuessResult[]>("guessResults");

  joinLobby(lobbyCode: string, displayName: string, callback: () => any) {
    this.socket.emit("joinLobby", { lobbyCode: lobbyCode, displayName: displayName });
    this.joinCallback = callback;
  }

  takeGuess(guessValue: number) {
    this.socket.emit("takeGuess", {
      guessValue: guessValue,
    });
  }

}

export interface GuessResult {
  displayName: string,
  guessValue: number,
}

export interface PlayerListEntry {
  displayName: string,
  isBabo: boolean,
}
