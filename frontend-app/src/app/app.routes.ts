import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {authGuardLogged, authGuardUnlogged} from "./services/auth-guard.service";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [authGuardUnlogged]},
  { path: 'register', component: RegisterComponent, canActivate: [authGuardUnlogged]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
