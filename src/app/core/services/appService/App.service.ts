import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from '../../constants';
import { ToastServiceService } from '../toast-message/toast-service.service';
import { CurrentUserService } from '../current-user/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService extends ApiService {

  baseUrl: string;
  constructor(public http: HttpClient,
    private toast : ToastServiceService,
    private currentUser : CurrentUserService) {
    super(http,toast,currentUser);
    this.baseUrl = urlConstants.SERVICES.APP;
  }
}
