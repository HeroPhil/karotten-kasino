import { Component, OnInit } from '@angular/core';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'babo-result',
  templateUrl: './babo-result.component.html',
  styleUrls: ['./babo-result.component.css']
})
export class BaboResultComponent {

  constructor(private priceIsNiceService: PriceIsNiceService) { }


  onSubmit(){
    this.priceIsNiceService.closeRound();
  }

}
