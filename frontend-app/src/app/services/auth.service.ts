import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  private loginStatus!: boolean
  private accessToken!: string

  loginChange = new Subject<boolean>()

  login(email: string, password: string): Observable<any> {
    let params = new HttpParams()
    params = params.append('email', email )
    params = params.append('password', password)
    return this.http.post<any>(`${this.API}/login`, {},
      {
        params : params
      }).pipe(
      map((data: {message: string, access_token: string, token_type: string}) => {
        localStorage.setItem("access_token", data.access_token)
        this.loginStatus = true;
        this.accessToken = data.access_token
        this.loginChange.next(this.loginStatus)
        localStorage.setItem("login_status", String(this.loginStatus))
        this.router.navigate(['/'])
      })
    )
  }

  register(username: string, email:string, password: string){
    let params = new HttpParams()
    params = params.append('name', username )
    params = params.append('email', email )
    params = params.append('password', password)

    return this.http.post<any>(`${this.API}/register`, {},
      {
        params : params
      }).pipe(
      map((data: {message: string, access_token: string, token_type: string}) => {
        localStorage.setItem("access_token", data.access_token)
        this.loginStatus = true;
        this.accessToken = data.access_token
        this.loginChange.next(this.loginStatus)
        localStorage.setItem("login_status", String(this.loginStatus))
        this.router.navigate(['/'])
      })
    )
  }

  getAccessTokenFromLs(){
    return localStorage.getItem("access_token")
  }

  setAccessToken(){
    if(!this.accessToken) this.accessToken = this.getAccessTokenFromLs()!

  }

  getAccessToken(){
    return this.accessToken
  }

  getLoginStatusFromLS(){
    return localStorage.getItem("login_status")
  }

  setLoginStatus(){
    this.loginStatus = !!this.getLoginStatusFromLS();
  }

  getLoginStatus(){
    return this.loginStatus
  }

  logout(){
    this.loginStatus = false
    this.loginChange.next(this.loginStatus)
    localStorage.clear()
    console.log("logged out")
  }
}
