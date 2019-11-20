import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Channel} from "../interfaces/channel";
import {Router} from "@angular/router";
import {tick} from "@angular/core/testing";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private _http: HttpClient, private cookieService: CookieService, private router: Router) {

  }

  get(): Observable<any> {
    return this._http.get("http://localhost:3000/channel/subscribedBy/"+this.cookieService.get('id_user'))
  }

  create(data): Observable<Channel> {
    return this._http.post<Channel>("http://localhost:3000/channel", {
      idChannel: data.idChannel,
      name: data.channelName,
      description: data.channelDescription,
    })
  }

  join(idChannel, idUser){
    this._http.get("http://localhost:3000/channel/findId/"+idChannel).subscribe( resp => {
       this._http.post<Channel>("http://localhost:3000/channel/subscribe", {
         idChannel: resp['_id'],
         idUser: idUser,
       }, {observe: 'response'}).subscribe( final => {

       });
    })
  }
}



