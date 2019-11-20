import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ChannelComponent} from "./channel/channel.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:  LoginComponent},
  {path: 'signup', component: SignupComponent },
  {path: 'channel', component: ChannelComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
