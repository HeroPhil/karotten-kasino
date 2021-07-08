import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PriceIsNiceService {

  joinCallback: (() => any) | undefined = undefined;

  constructor(private socket: Socket) {
    this.socket.on("joinLobbyAkw", () => {
      if (this.joinCallback != undefined) {
        this.joinCallback();
        this.joinCallback = undefined;
      }
    });
  }

  lobbyCode: string|undefined;

  players = this.socket.fromEvent<PlayerListEntry[]>("playerList");
  isBabo = this.socket.fromEvent<boolean>("youAreBabo");
  guessResults = this.socket.fromEvent<GuessResult[]>("guessResults");
  guessInformation = this.socket.fromEvent<GuessInformation>("guessInformation");
  lobbyStatus = this.socket.fromEvent<number>("lobbyStatus");
  playerJoined = this.socket.fromEvent<string>("playerJoined");
  playerYeeted = this.socket.fromEvent<string>("playerYeeted");


  joinLobby(lobbyCode: string, displayName: string, callback: () => any) {
    this.socket.emit("joinLobby", { lobbyCode: lobbyCode, displayName: displayName });
    this.joinCallback = callback;
    this.lobbyCode = lobbyCode;
  }

  takeGuess(guessValue: number) {
    this.socket.emit("takeGuess", {
      guessValue: guessValue,
    });
  }

  submitGuessInformation(guessInformation: GuessInformation) {
    this.socket.emit("submitGuessInformation", guessInformation);
  }

  closeRound() {
    this.socket.emit("closeRound");
  }


}

export interface GuessResult {
  displayName: string,
  guessValue: number,
  guessDelta: number,
  points: number,
  pointsDelta: number,
}

export interface PlayerListEntry {
  displayName: string,
  isBabo: boolean,
  points: number,
}

export interface GuessInformation {
  price?: number | string,
  name: string,
  description?: string,
  imageUrls?: string[],
}
