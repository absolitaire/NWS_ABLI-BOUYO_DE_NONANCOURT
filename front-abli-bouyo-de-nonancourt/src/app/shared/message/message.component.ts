import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from '../interfaces/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // private property to store messages
  private _messages : Message[];
  constructor(private _router: Router) {
    this._messages = {} as Message[];
  }

  ngOnInit() {
  }
  /**
   * Returns private property _message
   */
  get messages(): Message[] {
    return this._messages;
  }

  /**
   * Sets private property _message
   */
  @Input()
  set messages(messages: Message[]) {
    this._messages = messages;
  }
}
