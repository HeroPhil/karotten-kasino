import { GuessInformation } from "./guessInformation";
import { Player, PlayerStatus } from "./player";

export enum LobbyStatus {
    roundSetup,
    roundStart,
    guessOpen,
    guessClosed
}

export class Lobby {

    private players: Player[] = [];
    public baboId: string | undefined;
    private lobbyStatus!: LobbyStatus;
    public currentGuessInformation: GuessInformation | undefined;

    constructor(public id: string) {
        this.lobbyStatus = LobbyStatus.roundStart;
    }

    getLobbyStatus() {
        return this.lobbyStatus;
    }

    setLobbyStatus(lobbyStatus: LobbyStatus) {
        this.lobbyStatus = lobbyStatus;
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

    yeetPlayer(clientId: string) {
        this.players.splice(this.players.findIndex((player) => player.id == clientId), 1);
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

    getPlayerStatus(clientId: string) {
        if (this.lobbyStatus == LobbyStatus.roundSetup) {
            return PlayerStatus.void;
        }

        const player = this.players.find(((player) => player.id == clientId));

        if (player == undefined) {
            return;
        }

        if (player.id == this.baboId) {
            return PlayerStatus.babo;
        }

        if (this.lobbyStatus != LobbyStatus.guessOpen) {
            return PlayerStatus.void;
        }

        if (this.playerHasGuessedOrIsBabo(player)) {
            return PlayerStatus.guessTaken;
        } else {
            return PlayerStatus.guessing;
        }
    }

    playerHasGuessedOrIsBabo(player: Player) {
        return !(player.guessValue == undefined && player.id != this.baboId);
    }

    allPlayersHaveGuessed(): boolean {
        for (const player of this.players) {
            if (!this.playerHasGuessedOrIsBabo(player)) {
                return false;
            };
        }
        return true;
    }

    prepNextRound() {
        this.currentGuessInformation = undefined;
        for (const player of this.players) {
            player.prepNextRound();
        }

    }
}