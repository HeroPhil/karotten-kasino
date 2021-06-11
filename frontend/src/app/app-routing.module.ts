import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { LobbyScreenComponent } from './screens/lobby-screen/lobby-screen.component';

const routes: Routes = [
  { path: "", component: LandingScreenComponent },
  { path: "lobby", component: LobbyScreenComponent },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
