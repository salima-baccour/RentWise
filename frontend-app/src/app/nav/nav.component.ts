import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import { CommonModule} from "@angular/common";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    CommonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent implements OnInit, OnDestroy{
  loginStatus!:boolean
  subscription!: Subscription
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.loginStatus = this.authService.getLoginStatus()
    this.subscription = this.authService.loginChange.subscribe(

      (data) => {

        this.loginStatus = data
      }
    )
  }

  logout(){
    this.authService.logout()

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
