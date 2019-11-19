import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "../shared/services/login.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../shared/services/channels.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";



@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  channels: any;
  private _dialogStatus: string;
  private _channelDialog: MatDialogRef<DialogComponent>;

  constructor( private cookieService: CookieService, private _loginService: LoginService,
               private _channelsService: ChannelsService, private router: Router,
               private _dialog: MatDialog) {
    this.channels = [];
    this._dialogStatus = 'inactive';
  }

  ngOnInit() {
    this._loginService.verify().subscribe(user => {
      //If the user if verified, we get his data
      console.log(user);
      this._channelsService.get().subscribe(data => {
        console.log(data);
      });
    });
  }

  create(){
    this._dialogStatus = 'active';

    this._channelDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    this._channelDialog.afterClosed().subscribe(data => {
        console.log(data);
      }
    );
  }

  join(){

  }
}
