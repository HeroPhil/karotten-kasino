import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebugComponent } from './debug/debug.component';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { MenuComponent } from './screens/landing-screen/components/menu/menu.component';

const config: SocketIoConfig = {
  url: "http://localhost:3000", // ?
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    LandingScreenComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
