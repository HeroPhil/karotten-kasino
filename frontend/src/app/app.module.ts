import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebugComponent } from './debug/debug.component';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { MenuComponent } from './screens/landing-screen/components/menu/menu.component';
import { FooterComponent } from './screens/landing-screen/components/footer/footer.component';
import { ContentPreviewSliderComponent } from './screens/landing-screen/components/content-preview-slider/content-preview-slider.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';


const config: SocketIoConfig = {
  url: window.location.origin,
};  // ?

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    LandingScreenComponent,
    MenuComponent,
    FooterComponent,
    ContentPreviewSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    TabMenuModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
