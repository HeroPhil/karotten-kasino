import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/services/lobby.service';

@Component({
  selector: 'join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css']
})
export class JoinLobbyComponent implements OnInit {


  constructor(private lobbyService: LobbyService, private formBuilder: FormBuilder, private router: Router) { }

  joinForm = this.formBuilder.group({ lobbyCode: "", displayName: "" });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.lobbyService.joinLobby(this.joinForm.value.lobbyCode, this.joinForm.value.displayName, () => {
      this.router.navigate(["/price-is-nice"]);
    }); // TODO validate input
  }

}
