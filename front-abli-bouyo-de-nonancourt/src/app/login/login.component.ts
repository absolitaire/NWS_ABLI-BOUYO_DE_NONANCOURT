import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { User } from '../shared/interfaces/user';
import {Router} from "@angular/router";
import {LoginService} from "../shared/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges  {

  private readonly _form: FormGroup;

  private _model: User;

  constructor(private _loginService: LoginService, private router: Router) {
    this._form = this._buildForm();
  }

  ngOnInit() {
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue && record.model.currentValue.address) {
      this._model = record.model.currentValue;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        login: '',
        password: '',
        email: '',
      };
    }
  }
  cancel() {
    this.router.navigateByUrl('/');
  }

  submit(user: User) {
    this._loginService
      .login(user);

    this.router.navigateByUrl('/');
  }

  get form(): FormGroup {
    return this._form;
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: User) {
    this._model = model;
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      login: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }
}
