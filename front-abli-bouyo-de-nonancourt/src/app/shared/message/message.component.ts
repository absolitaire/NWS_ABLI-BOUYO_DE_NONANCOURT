import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from '../interfaces/message';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../services/login.service';
import {MessagesService} from '../services/messages.service';
import {interval, Observable} from 'rxjs';
import {UserBack} from '../interfaces/user-back';
import {Channel} from '../interfaces/channel';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  // private property to store messages
  private _messages : Message[];
  private _idChannel = '';
  private _users : UserBack[];
  private _userIds : string[];
  private _text: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router,
              private _loginService: LoginService,
              private cookieService: CookieService,
              private _messagesService: MessagesService,
  ) {
    this._messages = {} as Message[];
    this._users = [] as UserBack[];
    this._userIds = [] as string[];
    this._idChannel = '' as string;

  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._loginService.verify().subscribe(user => {
    this.cookieService.set('id_user', user['userId']);

    interval(5000).subscribe(_ => this.refresh());
    this.refresh();

    });
  }
  /**
   * Reload the messages
   */
  private refresh() {

    console.log(this._userIds);
    this._messagesService.get(this._idChannel).subscribe(data => {
      console.log(data);
      this.messages = data;

    });
  }

  /**
   * Returns private property _message
   */
  get messages(): Message[] {
    // console.log(this._users)
    return this._messages;
  }

  /**
   * Sets private property _message
   */
  @Input()
  set messages(messages: Message[]) {
    this._messages = messages;
  }

  /**
   * Returns private property _message
   */
  get idChannelCourant(): string {
     console.log(this._idChannel);
    return this._idChannel;
  }

  /**
   * Sets private property _message
   */
  @Input()
  set idChannelCourant(id: string) {
    this._idChannel = id;
    this.refresh();
  }

  /**
   * Sets private property _text
   */
  @Input()
  set text(value: any) {
    this._text = value;
  }
  /**
   * Returns private property text
   */
  get text(): any {
    return this._text;
  }
  /**
   * Send the user's text to the server
   */
  send(text: string) {
    this._messagesService.send(text, this._idChannel);
    this.refresh();
    this.text = '';
  }
}
