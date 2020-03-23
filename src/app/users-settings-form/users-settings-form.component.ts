import { Observable } from 'rxjs';
import { DataService } from './../data/data.service';
import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-users-settings-form',
  templateUrl: './users-settings-form.component.html',
  styleUrls: ['./users-settings-form.component.css']
})
export class UsersSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Orin',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes...'
  };

  userSettings: UserSettings = {...this.originalUserSettings};
  postError = false;
  postErrorMessage = '';
  subscriptionTypes = new Observable<string[]>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }


  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);

    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error  => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above error';
    }
  }
}
