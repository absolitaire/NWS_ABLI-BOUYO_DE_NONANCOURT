import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "../shared/services/login.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../shared/services/channels.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {Channel} from "../shared/interfaces/channel";
import {Message} from '../shared/interfaces/message';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  channels: Channel[];
  //private idCurrentChannel: string;
  private _dialogStatus: string;
  private _channelDialog: MatDialogRef<DialogComponent>;
  private _messages: Message[];
  private _idChannel: string;
  idChannel: any;

  constructor( private cookieService: CookieService, private _loginService: LoginService,
               private _channelsService: ChannelsService, private router: Router,
               private _dialog: MatDialog, private _http: HttpClient){
    this.channels = [];
    this._dialogStatus = 'inactive';
    this._messages = [];
    this._idChannel = '';
  }

  ngOnInit() {
    this._loginService.verify().subscribe(user => {
      //If the user if verified, we get his data
      this.cookieService.set('id_user', user['userId']);
      this._channelsService.get().subscribe(data => {

        this.channels = data;
        console.log(this.channels);
      });
    });
  }

  updateChannels(){
    this._channelsService.get().subscribe(data => {
      this.channels = data;
    });
  }

  create(){
    this._dialogStatus = 'active';

    this._channelDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });
    this._channelDialog.afterClosed().subscribe(data => {
        this._channelsService.create(data.value).subscribe( resp => {
          this.join(resp['idChannel'])
        });
      }
    );
  }

  join(idChannel) {
    this._http.get("http://localhost:3000/channel/findId/"+idChannel).subscribe( resp => {
      this._http.post<Channel>("http://localhost:3000/channel/subscribe", {
        idChannel: resp['_id'],
        idUser: this.cookieService.get('id_user'),
      }, {observe: 'response'}).subscribe( final => {
          this.updateChannels();
      });
    })
  }

  switch(id: string){
    this._idChannel = id;
  }

  /**
   * Returns private property _message
   */
  get idChannelCourant(): string {
    // console.log(this._users)
    return this._idChannel;
  }

  /**
   * Sets private property _message
   */
  @Input()
  set idChannelCourant(id: string) {
    this._idChannel = id;
  }
}
