import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {

  }

  login(user: User): Observable<any> {
    this._http.post<User>("http://localhost:3000/auth/login", {
      login: user.login,
      password: user.password,
    }, {observe: 'response'}).subscribe(resp => {
      console.log(resp.headers.get('X-Custom-Header'));
      console.log(resp.body)
    });
    return null;
  }
}
