import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "../shared/services/login.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../shared/services/channels.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {Channel} from "../shared/interfaces/channel";
import {Message} from '../shared/interfaces/message';



@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  channels: Channel[];
  private _dialogStatus: string;
  private _channelDialog: MatDialogRef<DialogComponent>;
  private _messages: Message[];

  constructor( private cookieService: CookieService, private _loginService: LoginService,
               private _channelsService: ChannelsService, private router: Router,
               private _dialog: MatDialog) {
    this.channels = [];
    this._dialogStatus = 'inactive';
    this._messages = [];
  }

  ngOnInit() {
    this._loginService.verify().subscribe(user => {
      //If the user if verified, we get his data
      console.log(user);
      this.cookieService.set('id_user', user['userId']);
      this._channelsService.get().subscribe(data => {
        console.log(data);
        this.channels = data;
      });
    });
  }

  create(){
    this._dialogStatus = 'active';

    this._channelDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });
    const id_user = this.cookieService.get('id_user');
    this._channelDialog.afterClosed().subscribe(data => {
        this._channelsService.create(data.value, id_user);
      }
    );
  }

  join(){
    //this._channelsService.join(data.value, this.cookieService);
  }
}
