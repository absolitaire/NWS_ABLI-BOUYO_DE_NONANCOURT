import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private _http: HttpClient, private cookieService: CookieService) {

  }

  get(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token')
      })
    };
    return this._http.get("http://localhost:3000/channel", httpOptions)
  }
}



