import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./nav/nav.component";
import {HomeComponent} from "./home/home.component";
import {CommonModule} from "@angular/common";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private authService: AuthService) {

  }

  ngOnInit(){
    this.authService.setLoginStatus()
    this.authService.setAccessToken()
  }
}
