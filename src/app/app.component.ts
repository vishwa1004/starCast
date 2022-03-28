import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CurrentUserService } from './core/services/current-user/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate :TranslateService,
    private platform : Platform,
    private router : Router,
    private currentUser :CurrentUserService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    console.log("appcompnent", translate.getDefaultLang());
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.currentUser.getUser().then(success => {
        if (success) {
          this.router.navigate(['/menu/tabs/home']);
        }else{
          this.router.navigate(['/login']);
        }
      }).catch(error => {
      })
    });
  }
}
