import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Channel} from "../interfaces/channel";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private _http: HttpClient, private cookieService: CookieService) {

  }

  get(): Observable<any> {
    return this._http.get("http://localhost:3000/channel/subscribedBy/"+this.cookieService.get('id_user'))
  }

  create(data, iduser) {
    this._http.post<Channel>("http://localhost:3000/channel", {
      idChannel: data.idChannel,
      name: data.channelName,
      description: data.channelDescription,
    }, {observe: 'response'}).subscribe(resp => {
      console.log(['body']['_id']);
      //Si tout se passe bien on rejoin le channel
      this.join(resp['body']['_id'], iduser)

    });
  }

  private join(idChannel, idUser) {
    this._http.post<Channel>("http://localhost:3000/channel/subscribe", {
      idChannel: idChannel,
      idUser: idUser,
    }, {observe: 'response'}).subscribe(resp => {
      console.log(resp);
    });
  }
}



