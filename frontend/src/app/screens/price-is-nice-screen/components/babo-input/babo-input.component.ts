import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'babo-input',
  templateUrl: './babo-input.component.html',
  styleUrls: ['./babo-input.component.css']
})
export class BaboInputComponent {

  // imageUrls = [];

  guessInformationForm = this.formBuilder.group({
    price: undefined,
    name: undefined,
    description: undefined,
    imageUrls: [],
  });

  constructor(private priceIsNiceService: PriceIsNiceService, private formBuilder: FormBuilder) { }


  onSubmit() {
    this.priceIsNiceService.submitGuessInformation(this.guessInformationForm.value);
    this.guessInformationForm.reset();
    this.guessInformationForm.value.imageUrls = [];
  }

}
