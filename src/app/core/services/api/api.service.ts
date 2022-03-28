import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RequestParams } from '../../interfaces/request-params';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastServiceService } from '../toast-message/toast-service.service';
import { CurrentUserService } from '../current-user/current-user.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  popOpen: boolean = false;
  baseUrl: string;
  auth: AuthService;
  router: Router;
  token;
  alertController: AlertController
  constructor(public http: HttpClient,
    private toastService: ToastServiceService,
    private user: CurrentUserService
  ) { 
    this.setHeaders();
  }

   setHeaders() {
    return this.user.getToken().then(token => {
      console.log(token, "token");
      // const headers = new HttpHeaders().set('Authorization', token.token);
      this.token  = token;
    })
  }
  get(requestParam: RequestParams): Observable<any> {
    console.log( this.token, "token")
    this.token =   !this.token ? this.setHeaders() : this.token;
    const headers = new HttpHeaders().set('x-access-token', this.token);
    console.log(headers, "headers")
    return this.http.get(environment.apiBaseUrl + requestParam.url, { headers:headers  }).pipe(
      tap((data: any) => {
        this.toastService.displayMessage(data.message, 'success')
        return data;
      }, error => {
        this.toastService.displayMessage(error.error.message, 'danger');
      }),
      catchError(this.handleError([]))
    )
  }

  post(requestParam: RequestParams): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', this.user.getUserToken());
    console.log( this.token, "token")
    const headers = new HttpHeaders().set('Authorization', this.token);
    console.log(headers, "headers")
    return this.http.post(environment.apiBaseUrl + requestParam.url, requestParam.payload, { headers: headers }).pipe(
      tap((data: any) => {
        this.toastService.displayMessage(data.message, 'success');
        return data;
      }, error => {
        this.toastService.displayMessage(error.error.message, 'danger');
      }),
      catchError(this.handleError([]))
    )
  }
  guestUser(requestParam: RequestParams): Observable<any> {
    return this.http.post(environment.apiBaseUrl + requestParam.url, requestParam.payload).pipe(
      tap((data: any) => {
        this.toastService.displayMessage(data.message, 'success');
        return data;
      }, error => {
        this.toastService.displayMessage(error.error.message, 'danger');
      }),
      catchError(this.handleError([]))
    )
  }

  put(requestParam: RequestParams): Observable<any> {
    return this.http.put(environment.apiBaseUrl + requestParam.url, requestParam.payload).pipe(
      tap(data => {
        return data
      }, error => {
      }),
      catchError(this.handleError([]))
    )
  }

  delete(requestParam: RequestParams): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + this.baseUrl + requestParam.url).pipe(
      tap(data => {
        return data
      }, error => {
      }),
      catchError(this.handleError([]))
    )
  }

  // postWithHeader(url, data, id): Observable<any> {

  //   const headers = new HttpHeaders()
  //     .set('vendorid', id);
  //   return this.http.post(environment.apiBaseUrl + this.baseUrl + url.url,{headers}).pipe(
  //     tap(data => {
  //       console.log(data, " data innnn ******");
  //       return data
  //     }, error => {
  //       console.log('error ====>', error);
  //     }),
  //     catchError(this.handleError([]))
  //   )
  // }

  private handleError(result) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      if (error.status === 401) {

      } else {

      }
      return of(result);
    };
  }
}
