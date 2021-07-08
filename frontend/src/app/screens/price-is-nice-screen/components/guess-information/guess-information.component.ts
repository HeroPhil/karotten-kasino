import { Component, OnInit } from '@angular/core';
import { GuessInformation, PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'guess-information',
  templateUrl: './guess-information.component.html',
  styleUrls: ['./guess-information.component.css']
})
export class GuessInformationComponent implements OnInit {

  guessInformation: GuessInformation = {
    name: "Rätselhaftes Produkt",
    price: "???",
  };

  constructor(private priceIsNiceService: PriceIsNiceService) { }

  ngOnInit(): void {
    this.priceIsNiceService.guessInformation.subscribe((data) => {
      this.guessInformation = data;
    });
  }

}
