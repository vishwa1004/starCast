import { Injectable } from '@angular/core';
import { urlConstants } from '../../constants';
import { Subject } from 'rxjs';
import { CurrentUserService } from '../current-user/current-user.service';
import { AppService } from '../appService/App.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  timeInterval: any;
  $notificationSubject = new Subject<any>();

  constructor(
    private app: AppService,
    private user: CurrentUserService
  ) { }

  startNotificationPooling() {
    this.timeInterval = setInterval(() => {
      // if (this.networkAvailable) {
      this.checkForNotificationApi();
      // }
      // else {
      //   console.log("no internet");
      // }
    }, 90000);
    this.checkForNotificationApi();
  }

  checkForNotificationApi() {
  }

  internalNotificationsHandler(notifications) {

  }

  stopNotificationPooling() {
    clearInterval(this.timeInterval);
  }


}
