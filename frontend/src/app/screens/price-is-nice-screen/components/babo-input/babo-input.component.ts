import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlayerListEntry, PriceIsNiceService } from 'src/app/services/price-is-nice.service';
import { WebcrawlerService } from 'src/app/services/webcrawler.service';

@Component({
  selector: 'app-babo-input',
  templateUrl: './babo-input.component.html',
  styleUrls: ['./babo-input.component.css']
})
export class BaboInputComponent implements OnInit {

  showImportDialog = false;
  isLoading = false;
  players: PlayerListEntry[] = [];

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
  
  ngOnInit(): void {
    this.priceIsNiceService.players.subscribe(players => {
      this.players = players;
    });
  }

  onSubmit() {
    this.priceIsNiceService.submitGuessInformation(this.guessInformationForm.value);
    this.guessInformationForm.reset();
    this.guessInformationForm.value.imageUrls = [];
  }

  async importFromAmazon() {
    this.isLoading = true;
    this.guessInformationForm.setValue(
      await this.webcrawlerService.getProductInformationFromAmazonUrl(this.amazonImportForm.value.targetUrl)
    );

    this.amazonImportForm.reset();
    this.showImportDialog = false;
    this.isLoading = false;
  }

  closingDialog() {
    this.amazonImportForm.reset();
    this.isLoading = false;
  }

}
