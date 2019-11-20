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

  ngOnInit() {
    this._loginService.verify().subscribe(user => {
    this.cookieService.set('id_user', user['userId']);

    interval(5000).subscribe(_ => this.refresh());
    this.refresh();

    });
  }
  private refresh() {

    console.log(this._userIds);
    this._messagesService.get(this._idChannel).subscribe(data => {
      console.log(data);
      this.messages = data;

    });
  }

  // private refresh() {
  //
  //   console.log(this._userIds);
  //   this._messagesService.get(this._idChannel).subscribe(data => {
  //     // console.log(data);
  //     this.messages = data;
  //     this.messages.map((_: Message) => {
  //
  //       // console.log(`AYY ${_.idUser}`);
  //       if (this._userIds.indexOf(_.idUser ) !== -1) {
  //         // if (this._userIds.find(__ => __ === _.idUser )) {
  //       //   if (this._userIds.find(_.idUser )) {
  //         console.log(`AYY ${_.idUser}`);
  //       } else {
  //         console.log(`NO ${_.idUser}`);
  //         this._messagesService.getUserData(_.idUser).subscribe(tmp => {
  //           // console.log(tmp);
  //           this._users = this._users.concat(tmp);
  //           // this._userIds = this._userIds.concat(_.idUser);
  //           this._userIds.push(_.idUser);
  //         });
  //       }
  //     });
  // });
  // }
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
  // /**
  //  * Returns private property _message
  //  */
  // get users(): UserBack[] {
  //   return this._users;
  // }
  //
  // /**
  //  * Sets private property _message
  //  */
  // @Input()
  // set users(users: UserBack[]) {
  //   this._users = users;
  // }
  // @Input()
  // findUserDatas(message: Message) {
  //   const i = this._userIds.indexOf(message.idUser);
  //   console.log(this._userIds[i]);
  //   return this._users[i];
  // }


  @Input()
  set text(value: any) {
    this._text = value;
  }
  get text(): any {
    return this._text;
  }

  send(text: string) {
    this._messagesService.send(text, this._idChannel);
    this.refresh();
    this.text = '';
  }
}
