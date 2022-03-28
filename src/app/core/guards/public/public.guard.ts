import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../services/current-user/current-user.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private userService: CurrentUserService, private router: Router,
    private navCtrl: NavController
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.userService.getUser().then(success => {
        console.log(success, "success");
        if (success) {
          this.navCtrl.navigateRoot('/menu/tabs/home');
          resolve(false)
        } else {
          resolve(true)
        }
      }).catch(error => {
        resolve(true)
      })
    })
  }

}
