import { Player } from "./player";

export class Lobby {

    private players: Player[] = [];
    public baboId!: string;

    constructor(public id: string) { }

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

    allPlayersHaveGuessed(): boolean {
        for (const player of this.players) {
            if (player.guess == undefined && player.id != this.baboId) {
                return false;
            }
        }
        return true;
    }
}