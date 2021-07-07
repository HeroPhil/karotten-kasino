import { DebugHandler } from "./debug";
import { LobbyHandler } from "./price-is-nice";
import { BackendServer } from "./server";

export const server = new BackendServer();

const debugHandler = new DebugHandler();
const lobbyHandler = new LobbyHandler();

server.start();


