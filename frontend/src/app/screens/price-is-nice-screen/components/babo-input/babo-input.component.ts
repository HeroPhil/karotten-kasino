import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'babo-input',
  templateUrl: './babo-input.component.html',
  styleUrls: ['./babo-input.component.css']
})
export class BaboInputComponent implements OnInit {

  // imageUrls = [];

  guessInformationForm = this.formBuilder.group({
    price: undefined,
    name: undefined,
    description: undefined,
    imageUrls: [],
  });

  constructor(private lobbyService: LobbyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.lobbyService.submitGuessInformation(this.guessInformationForm.value);
    this.guessInformationForm.reset();
    this.guessInformationForm.value.imageUrls = [];
  }

}
