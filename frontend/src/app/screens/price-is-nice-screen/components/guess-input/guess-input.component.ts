import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'app-guess-input',
  templateUrl: './guess-input.component.html',
  styleUrls: ['./guess-input.component.css']
})
export class GuessInputComponent {

  constructor(private priceIsNiceService: PriceIsNiceService, private formBuilder: FormBuilder) { }

  guessForm = this.formBuilder.group({ guessValue: 0 });
  hidden = false;

  onSubmit(): void {
    this.priceIsNiceService.takeGuess(this.guessForm.value.guessValue);
    this.guessForm.reset();
    this.hidden = true;
  }

}
