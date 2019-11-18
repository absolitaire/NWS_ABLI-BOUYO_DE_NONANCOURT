import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {User} from "../shared/interfaces/user";
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import {CustomValidators} from "./custom-validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private  _form: FormGroup;

  constructor(private _userService: UserService, private router: Router) {

    this._form = this._buildForm();
  }

  ngOnInit() {
  }

  cancel() {

  }

  submit(user: User) {
    this._userService
      .add(user)

    this.router.navigateByUrl('/');
  }

  get form(): FormGroup {
    return this._form;
  }


  private _buildForm(): FormGroup {
      return new FormGroup({
        login: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(2)
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(2)
        ])),
        passwordconfirm: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(2)
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(2)
        ])),
      });
  }


}
