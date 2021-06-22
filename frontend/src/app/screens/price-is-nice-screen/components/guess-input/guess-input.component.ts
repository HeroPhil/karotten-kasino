import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'guess-input',
  templateUrl: './guess-input.component.html',
  styleUrls: ['./guess-input.component.css']
})
export class GuessInputComponent implements OnInit {

  constructor(private lobbyService: LobbyService, private formBuilder: FormBuilder) { }

  guessForm = this.formBuilder.group({ guessValue: 0 });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.lobbyService.takeGuess(this.guessForm.value.guessValue);
    this.guessForm.reset();
  }

}
