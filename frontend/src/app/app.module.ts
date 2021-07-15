import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebugComponent } from './debug/debug.component';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { MenuComponent } from './screens/landing-screen/components/menu-deprecated/menu.component';
import { FooterComponent } from './screens/landing-screen/components/footer/footer.component';
import { ContentPreviewSliderComponent } from './screens/landing-screen/components/content-preview-slider/content-preview-slider.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { LobbyScreenComponent } from './screens/lobby-screen/lobby-screen.component';
import { JoinLobbyComponent } from './screens/lobby-screen/components/join-lobby/join-lobby.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceIsNiceScreenComponent } from './screens/price-is-nice-screen/price-is-nice-screen.component';
import { PlayerListComponent } from './screens/price-is-nice-screen/components/player-list/player-list.component';
import { GuessInputComponent } from './screens/price-is-nice-screen/components/guess-input/guess-input.component';
import { GuessResultComponent } from './screens/price-is-nice-screen/components/guess-result/guess-result.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BaboInputComponent } from './screens/price-is-nice-screen/components/babo-input/babo-input.component';
import { BaboResultComponent } from './screens/price-is-nice-screen/components/babo-result/babo-result.component';
import { ToastModule } from 'primeng/toast';
import { GuessInformationComponent } from './screens/price-is-nice-screen/components/guess-information/guess-information.component';
import { ChipsModule } from 'primeng/chips';
import { SplitterModule } from 'primeng/splitter';
import { ContactScreenComponent } from './screens/contact-screen/contact-screen.component';
import { GameOverviewScreenComponent } from './screens/game-overview-screen/game-overview-screen.component';
import { DialogModule } from 'primeng/dialog';


const config: SocketIoConfig = {
  url: window.location.origin, // TODO find solution for better dev testing
};  // ?

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    LandingScreenComponent,
    MenuComponent,
    FooterComponent,
    ContentPreviewSliderComponent,
    LobbyScreenComponent,
    JoinLobbyComponent,
    PriceIsNiceScreenComponent,
    PlayerListComponent,
    GuessInputComponent,
    GuessResultComponent,
    BaboInputComponent,
    BaboResultComponent,
    GuessInformationComponent,
    ContactScreenComponent,
    GameOverviewScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    TabMenuModule,
    CarouselModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ChipsModule,
    SplitterModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
