const fetch = require("node-fetch");
import parse from "node-html-parser";
import { server } from "..";

export class DebugHandler {

    constructor() {
        server.addSocketHandler((socket) => {
            socket.on("getTime", () => {
                console.log("time requested");
                socket.emit("resTime", Date.now().toLocaleString());
            });
        
            socket.on("scrape", async (url) => {
                const response = await fetch(url, {
                    mode: "cors"
                  });
                  console.log(response);
                  const text = await response.text();
                  console.log(text);
                  const terms = parse(text);
                  console.log(terms);
                  console.log(terms.querySelector('#productTitle').innerText);
                  console.log(terms.querySelector('#priceblock_ourprice').innerText);
                  console.log(terms.querySelector('#feature-bullets').innerText);
                  console.log(terms.querySelector('#altImages').querySelectorAll("img").map((htmlElement) => htmlElement.getAttribute("src")));
            });
        });
        
    }

}