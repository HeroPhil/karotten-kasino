import { Injectable } from '@angular/core';
import { GuessInformation } from './price-is-nice.service';
import { parse } from 'node-html-parser';
import { UrlResolver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WebcrawlerService {

  constructor () {}

  async getProductInformationFromAmazonUrl(url: string): Promise<GuessInformation> {

    const _url = new URL(url);
    _url.protocol = "http";
    _url.hostname = new URL(window.origin).hostname;
    _url.port = new URL(window.origin).port 
    _url.pathname = "amazon" + _url.pathname;

    url = _url.toString();

    const response = await fetch(url, {
      mode: "cors"
    });
    const text = await response.text();
    const terms = parse(text);
    
    return {
      name: terms.querySelector('#productTitle')?.innerText,
      price: terms.querySelector('#priceblock_ourprice')?.innerText,
      description: terms.querySelector('#feature-bullets')?.innerText,
      imageUrls: terms.querySelector('#altImages')?.querySelectorAll("img").map<string>((htmlElement) => htmlElement.getAttribute("src") ?? "").filter((imageUrl) => imageUrl != ""),
    };

  }
}
