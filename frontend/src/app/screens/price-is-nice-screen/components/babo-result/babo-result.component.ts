import { Component, OnInit } from '@angular/core';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'babo-result',
  templateUrl: './babo-result.component.html',
  styleUrls: ['./babo-result.component.css']
})
export class BaboResultComponent implements OnInit {

  constructor(private priceIsNiceService: PriceIsNiceService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.priceIsNiceService.closeRound();
  }

}
