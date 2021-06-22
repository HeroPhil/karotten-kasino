import { GuessInformation } from "./guessInformation";
import { Player } from "./player";

export enum LobbyStatus {
    roundSetup,
    roundStart,
    guessOpen,
    guessClosed
}

export class Lobby {

    private players: Player[] = [];
    public baboId!: string;
    private lobbyStatus!: LobbyStatus;
    public currentGuessInformation: GuessInformation | undefined;
    
    constructor(public id: string) { 
        this.lobbyStatus = LobbyStatus.roundStart;
    }

    getLobbyStatus() {
        return this.lobbyStatus;
    }

    advanceLobbyStatus() {
        this.lobbyStatus = (this.lobbyStatus.valueOf() + 1) % 4;
        console.log("lobby " + this.id + " advancing to " + this.lobbyStatus);
    }

    addPlayer(clientId: string, displayName: string) {
        if (!this.hasPlayer(clientId)) {
            this.players.push(new Player(clientId, displayName));
            if (this.baboId == undefined) {
                this.baboId = clientId; // first player is the first babo
            }
        }
    }

    hasPlayer(clientId: string) {
        for (const player of this.players) {
            if (player.id == clientId) {
                return true;
            }
        }
        return false;
    }

    getPlayers() {
        return this.players;
    }

    getPlayer(clientId: string) {
        return this.players.find((player) => player.id == clientId);
    }

    getBabo() {
        return this.players.find((player) => player.id == this.baboId);
    }

    setNextBabo() {
        this.baboId = this.players[(this.players.indexOf(this.getBabo()!) + 1) % this.players.length].id;
    }

    allPlayersHaveGuessed(): boolean {
        for (const player of this.players) {
            if (player.guess == undefined && player.id != this.baboId) {
                return false;
            }
        }
        return true;
    }

    clearGuesses() {
        for (const player of this.players) {
            player.guess = undefined;
        }

    }
}