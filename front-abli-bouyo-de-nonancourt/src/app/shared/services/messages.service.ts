import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Channel} from '../interfaces/channel';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _http: HttpClient, private cookieService: CookieService) {

  }

  get(idChannel): Observable<any> {
    return this._http.get(`http://localhost:3000/channel/richmessages?startingAt=0&threshold=-1&idChannel=${idChannel}`);
  }

  send(message, idChannel) {
    return this._http.post<Channel>('http://localhost:3000/channel/write', {
      idChannel: idChannel,
      content: message,
      idUser: this.cookieService.get('id_user'),
    }, {observe: 'response'}).subscribe( final => {

    });
  }

  delete(idMessage: string) {
    return this._http.delete(`http://localhost:3000/channel/erase/${idMessage}`);
  }
}



