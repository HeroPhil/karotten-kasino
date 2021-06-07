import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  constructor(private socket: Socket) { }

  currentTime = this.socket.fromEvent<string>("resTime");

  getTime() {
    console.log("service callback");
    this.socket.emit("getTime");
  }
}
