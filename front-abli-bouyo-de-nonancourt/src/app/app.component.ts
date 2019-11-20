import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "./shared/services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NWT';

  constructor(private _http: HttpClient, private _cookieService: CookieService, private router: Router) {

  }
  ngOnInit(): void {
  }

  disconnect(): void {
    this._cookieService.set('token', '');
    this.router.navigateByUrl("/");
  }

}
