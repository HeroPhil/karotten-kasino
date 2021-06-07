import { Component, OnInit } from '@angular/core';
import { DebugService } from '../services/debug.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  currentTime = "nothing there yet";

  constructor(private debugService: DebugService) { }


  ngOnInit(): void {
    this.debugService.currentTime.subscribe(time => this.currentTime = time);
  }

  getTime() {
    console.log("button callback");
    this.debugService.getTime();
  }

}
