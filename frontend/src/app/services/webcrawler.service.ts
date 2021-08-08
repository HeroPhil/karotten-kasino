import { Injectable } from '@angular/core';
import { GuessInformation } from './price-is-nice.service';
import { HTMLElement, parse } from 'node-html-parser';

@Injectable({
  providedIn: 'root'
})
export class WebcrawlerService {

  constructor() { }

  async getProductInformationFromAmazonUrl(url: string): Promise<GuessInformation> {

    const _url = new URL(url);
    _url.protocol = new URL(window.origin).protocol;
    _url.hostname = new URL(window.origin).hostname;
    _url.port = new URL(window.origin).port
    _url.pathname = "amazon" + _url.pathname;

    url = _url.toString();

    const response = await fetch(url, {
      mode: "cors"
    });
    const text = await response.text();
    const terms = parse(text);

    try {
      return {
        name: this.parseName(terms),
        price: this.parsePrice(terms),
        description: this.parseDescription(terms),
        imageUrls: this.parseImageUrls(terms),
      };
    } catch {
      return {
        name: "",
        price: "",
      };
    }

  }

  private parseName(terms: HTMLElement): string {
    let result = terms.querySelector('#productTitle')?.innerText ?? "Amazon Produkt";
    result = result.trim();
    return result;
  }

  private parsePrice(terms: HTMLElement): string {
    const htmlPriceSelectors = ['#priceblock_ourprice', '#priceblock_dealprice'];
    let result: string = "0";
    for (let selector of htmlPriceSelectors) {
      result = terms.querySelector(selector)?.innerText ?? "0";
      if (result != "0") {
        break;
      }
    }
    result.trim();
    result = result.split("€", 1)[0];
    result = result.trim();
    result = result.replace(",", ".");
    result = Number.parseFloat(result).toFixed(2);
    return result;
  }

  private parseDescription(terms: HTMLElement): string {
    const htmlPriceSelectors = ['#feature-bullets', '#productDescription'];

    let bulletsElement: HTMLElement;
    let indexMode: number | undefined;

    for (let selector of htmlPriceSelectors) {
      bulletsElement = terms.querySelector(selector);
      if ((bulletsElement?.innerText?.trim().length != 0) ?? false) {
        indexMode = htmlPriceSelectors.indexOf(selector);
        break;
      }
    }

    switch (indexMode) {
      case 0:
        return (bulletsElement!
          ?.querySelectorAll(".a-list-item")
          ?.map((htmlElement) => htmlElement.innerText.trim())
          ?.filter((feature) => feature != "")
          ?.reduce((previous, text) => previous += (" • " + text + "\n"), "")) ?? "";

      case 1:
        return (bulletsElement!
          ?.querySelectorAll("p")
          ?.map((htmlElement) => htmlElement.innerText.trim())
          ?.filter((feature) => feature != "")
          ?.reduce((previous, text) => previous += (" • " + text + "\n"), "")) ?? "";

      default:
        return "";
    }
  }

  private parseImageUrls(terms: HTMLElement): string[] {
    let result = terms.querySelector('#altImages')
      ?.querySelectorAll("img")
      .map<string>((htmlElement) => htmlElement.getAttribute("src") ?? "")
      .filter((imageUrl) => imageUrl != "")
      .filter((imageUrl) => !imageUrl.includes("transparent-pixel"))
      .map((imageUrl) => imageUrl.split(".").reduce((previous, current, index, arr) => previous += (index != arr.length - 2 ? ((index > 0 ? "." : "") + current) : "")), "");
    return result;
  }



}
