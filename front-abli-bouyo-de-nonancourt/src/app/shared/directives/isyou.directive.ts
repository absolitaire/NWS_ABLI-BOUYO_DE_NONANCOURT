import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Directive({
  selector: '[nwtIsYou]'
})
export class IsYouDirective implements OnInit {
  // private property to store user value
  private _user: any;

  /**
   * Component constructor
   */
  constructor(private _el: ElementRef, private _rd: Renderer2, private cookieService: CookieService) {
  }

  /**
   * Sets private property _user
   */
  @Input()
  set user(user: any) {
    this._user = user;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    of(this._user)
      .pipe(
         filter(_ => !!_ && this._user !== this.cookieService.get('id_user'))
        // filter(_ =>true )
      )
      .subscribe(_ =>{
        this._rd.setProperty(this._el.nativeElement, 'hidden', 'true');
        // console.log(`${this._user}   fff  ${this.cookieService.get('id_user')}`);
      })

      ;

 }  // <i class="material-icons">supervisor_account</i>
}
