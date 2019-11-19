import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../interfaces/user";
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient, private cookieService: CookieService,  private router: Router) {

  }

  login(user: User){
    this._http.post<User>("http://localhost:3000/auth/login", {
      login: user.login,
      password: user.password,
    }, {observe: 'response'}).subscribe(resp => {
      console.log(resp);
      // if the resp is ok then we stock the ID and redirect the user
      if(resp['ok']) {
        this.cookieService.set('token', resp['body']['access_token']);
        this.router.navigateByUrl('/channel')
      }else{
        this.router.navigateByUrl('/login')
      }
    });
  }

  verify(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token')
      })
    };
    return this._http.get("http://localhost:3000/auth/profile", httpOptions);
  }
}
