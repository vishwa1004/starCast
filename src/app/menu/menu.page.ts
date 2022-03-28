import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CurrentUserService } from '../core/services/current-user/current-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user;
  



  navigate = [
      {
        title: "Dashboard",
        url: "menu/home",
        icon: "speedometer-outline"
      },
      {
        title: "Postings",
        url: "menu/postings",
        icon: "newspaper-outline"
      },
      {
        title: "Cast",
        url: "menu/notifications",
        icon: "notifications-outline"
      },
      {
        title: "Profile",
        url: "menu/profile",
        icon: "person-outline"
      },
      {
        title: "Logout",
        url: '',
        icon: "log-out-outline"
      },
  ];
  selectedPath: string;
  appName: string

  constructor(
    private router: Router,
    private alertController: AlertController,
    private userService :CurrentUserService

  ) {
    console.log('menu loading');
    // translate.use('en');
  }

  ngOnInit() {}

  navigateTo(url) {
    if(url){
      this.router.navigate([url]);
    }else{
      this.logoutAlert();
    }
  }

  async logoutAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure, you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.userService.deleteUser().then(data =>{
              this.router.navigate(['/login']);
              })
          }
        }
      ]
    });
    await alert.present();
  }
}
