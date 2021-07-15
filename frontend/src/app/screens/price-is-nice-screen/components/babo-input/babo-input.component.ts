import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';
import { WebcrawlerService } from 'src/app/services/webcrawler.service';

@Component({
  selector: 'babo-input',
  templateUrl: './babo-input.component.html',
  styleUrls: ['./babo-input.component.css']
})
export class BaboInputComponent {

  showImportDialog = false;

  guessInformationForm = this.formBuilder.group({
    price: undefined,
    name: undefined,
    description: undefined,
    imageUrls: [],
  });

  amazonImportForm = this.formBuilder.group({
    targetUrl: ""
  });

  constructor(private priceIsNiceService: PriceIsNiceService, private formBuilder: FormBuilder, private webcrawlerService: WebcrawlerService) { }

  onSubmit() {
    this.priceIsNiceService.submitGuessInformation(this.guessInformationForm.value);
    this.guessInformationForm.reset();
    this.guessInformationForm.value.imageUrls = [];
  }

  async importFromAmazon() {
    this.guessInformationForm.setValue(
      await this.webcrawlerService.getProductInformationFromAmazonUrl(this.amazonImportForm.value.targetUrl)
    );

    this.amazonImportForm.reset();
    this.showImportDialog = false;
  }

}
