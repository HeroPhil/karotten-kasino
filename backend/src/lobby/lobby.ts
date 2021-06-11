export class Lobby {

    private clients: string[] = [];

    constructor(public id: string) {}

    addClient(clientId: string) {
        if(!this.clients.includes(clientId)) {
            this.clients.push(clientId);
        }
    }

    hasClient(clientId: string) {
        return this.clients.includes(clientId);
    } 

    getClients() {
        return this.clients;
    }
}