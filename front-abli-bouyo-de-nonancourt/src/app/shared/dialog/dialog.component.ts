import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Channel } from '../interfaces/channel';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'nwt-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.css' ]
})
export class DialogComponent implements OnInit, OnChanges {

  private readonly _form: FormGroup;
  private _model: Channel;

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private _channel: Channel) {
    this._form = this._buildForm();
  }

  /**
   * Returns person passed in dialog open
   */
  get channel(): Channel {
    return this._channel;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(channel: Channel) {
    this._dialogRef.close(channel);
  }

  get form(): FormGroup{
    return this._form;
  }

  ngOnChanges(record){
    if (record.model && record.model.currentValue && record.model.currentValue.address){
      this._model = record.model.currentValue;
      this._form.patchValue(this._model);
    }else{
      this._model = {
        idChannel: '',
        name: '',
        description: '',
        usersSubscribed: []
      }
    }
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      idChannel: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(5)
      ])),
      channelName: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      channelDescription: new FormControl()
    })
  }
}
