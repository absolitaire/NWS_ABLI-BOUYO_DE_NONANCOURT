import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {

  }

  add(user: User): Observable<any> {

    this._http.post<User>("http://localhost:3000/user",{login : user.login, password : user.password, email : user.email}, {observe: 'response'}).subscribe(resp => {
      console.log(resp.headers.get('X-Custom-Header'));
      console.log(resp.body)
    });
    return null;
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}



