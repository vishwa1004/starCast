import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../core/services/current-user/current-user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor( private userService : CurrentUserService,
    private router:Router) {
    console.log('menu loading');
    this.checkUser();
  }
  checkUser(){
    return new Promise((resolve, reject) => {
    this.userService.getUser().then(success => {
      if (success) {
        resolve(true)
      } else {
        this.router.navigateByUrl('login');
        resolve(false)
      }
    }).catch(error => {
      this.router.navigateByUrl('login');
      resolve(false)
    })
  })
  }
}
