import { Player } from "./player";

export class Lobby {

    private players: Player[] = [];

    constructor(public id: string) { }

    addPlayer(clientId: string, displayName: string) {
        if (!this.hasPlayer(clientId)) {
            this.players.push(new Player(clientId, displayName));
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
}