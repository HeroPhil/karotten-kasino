import { DebugHandler } from "./debug";
import { PriceIsNiceHandler } from "./price-is-nice/priceIsNiceHandler";
import { BackendServer } from "./server";

export const server = new BackendServer();

new DebugHandler();
new PriceIsNiceHandler();

server.start();


