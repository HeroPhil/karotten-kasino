import { Component, OnInit } from '@angular/core';
import { DebugService } from '../services/debug.service';
import { parse } from 'node-html-parser';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  currentTime = "nothing there yet";

  constructor(private debugService: DebugService) { }


  ngOnInit(): void {
    this.debugService.currentTime.subscribe(time => this.currentTime = time);
  }

  getTime() {
    console.log("button callback");
    this.debugService.getTime();
  }

  async getHtml(pUrl?: string) {
    // console.log("looking for blink camera now");
    const url = pUrl || "https://www.amazon.de/-/en/gp/product/B086DKVS1P?pf_rd_r=BT6CRB6JHSF8J0C18C6A&pf_rd_p=f6634045-2cd8-4654-8338-b9246a89c6f1&pd_rd_r=d0384c2f-65ab-4a64-850b-2f4e20052d76&pd_rd_w=DAUjR&pd_rd_wg=TYmdb&ref_=pd_gw_unk";
    // const response = await fetch(url, {
    //   mode: "cors"
    // });
    // console.log(response);
    // const text = await response.text();
    // console.log(text);
    // const terms = parse(text);
    // console.log(terms);
    // console.log(terms.querySelector('#productTitle').innerText);
    // console.log(terms.querySelector('#priceblock_ourprice').innerText);
    // console.log(terms.querySelector('#feature-bullets').innerText);
    // console.log(terms.querySelector('#altImages').querySelectorAll("img").map((htmlElement) => htmlElement.getAttribute("src")));

    this.debugService.scrape(url);

  }

}
