import { Component, OnInit } from '@angular/core';
import { GuessResult, PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'guess-result',
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.css']
})
export class GuessResultComponent implements OnInit {

  cols: any[] = [];
  results: GuessResult[] = [];

  constructor(private priceIsNiceService: PriceIsNiceService) { }

  ngOnInit(): void {
    this.priceIsNiceService.guessResults.subscribe((results) => {
      this.results = results.sort((a, b) =>
        a.guessDelta - b.guessDelta
      );
    });

    this.cols = [
      { field: 'displayName', header: 'Spieler' },
      { field: 'guessValue', header: 'Preis' },
      { field: 'guessDelta', header: 'Abstand' },
      { field: 'pointsDelta', header: 'Punkte' },
      // { field: 'points', header: 'Punkte Insgesamt' },
    ];

  }




}
