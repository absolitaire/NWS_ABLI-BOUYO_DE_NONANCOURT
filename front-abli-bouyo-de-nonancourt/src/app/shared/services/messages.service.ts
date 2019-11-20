import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _http: HttpClient, private cookieService: CookieService) {

  }

  get(idChannel): Observable<any> {
    return this._http.get(`http://localhost:3000/channel/richmessages?startingAt=0&threshold=-1&idChannel=${idChannel}`);
  }


  // getUserData(idUser): Observable<any> {
  //   return this._http.get(`http://localhost:3000/user/${idUser}`);
  // }


  // create(data, iduser) {
  //   this._http.post<Channel>("http://localhost:3000/channel", {
  //     idChannel: data.idChannel,
  //     name: data.channelName,
  //     description: data.channelDescription,
  //   }, {observe: 'response'}).subscribe(resp => {
  //     console.log(['body']['_id']);
  //     //Si tout se passe bien on rejoin le channel
  //     this.join(resp['body']['_id'], iduser)
  //
  //   });
  // }
  //
  // private join(idChannel, idUser) {
  //   this._http.post<Channel>("http://localhost:3000/channel/subscribe", {
  //     idChannel: idChannel,
  //     idUser: idUser,
  //   }, {observe: 'response'}).subscribe(resp => {
  //     console.log(resp);
  //   });
  // }
}



