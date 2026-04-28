import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {CanActivateFn, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {
  loginStatus!: boolean
  constructor(private authService: AuthService, private router: Router) { }

  canActivateLogged(): boolean {
    this.loginStatus = this.authService.getLoginStatus()
    if(this.loginStatus) {
      return true
    }
    else {
      this.router.navigate(['/home'])
      return false
    }
  }

  canActivateUnlogged(): boolean {
    this.loginStatus = this.authService.getLoginStatus()
    if(!this.loginStatus) {
      return true
    }
    else {
      this.router.navigate(['/home'])
      return false
    }
  }
}

export const authGuardLogged: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivateLogged()
}

export const authGuardUnlogged: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivateUnlogged()
}
