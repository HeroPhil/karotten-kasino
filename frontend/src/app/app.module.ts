import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DebugComponent } from './debug/debug.component';
import {ButtonModule} from 'primeng/button';

import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: "http://localhost:3000", // ?
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DebugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
