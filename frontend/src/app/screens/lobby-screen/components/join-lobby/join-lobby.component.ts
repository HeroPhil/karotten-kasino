import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PriceIsNiceService } from 'src/app/services/price-is-nice.service';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css']
})
export class JoinLobbyComponent {

  constructor(private priceIsNiceService: PriceIsNiceService, private formBuilder: FormBuilder, private router: Router) { }

  joinForm = this.formBuilder.group({ lobbyCode: "", displayName: "" });

  onSubmit(): void {
    this.priceIsNiceService.joinLobby(this.joinForm.value.lobbyCode, this.joinForm.value.displayName, () => {
      this.router.navigate(["/price-is-nice"]);
    }); // TODO validate input
  }

}
