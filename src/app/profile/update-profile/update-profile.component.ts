import { Component, Input, OnInit } from '@angular/core';
import { LoaderService, urlConstants, UtilsService } from 'src/app/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api/api.service';
import { CurrentUserService } from 'src/app/core/services/current-user/current-user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  fields;
  @Input() profile;
  userData;
  constructor(
    private utils: UtilsService,
    private modal: ModalController,
    private currentUser:CurrentUserService,
    private api : ApiService,
    private loader:LoaderService
  ) { }

  ngOnInit() {}
  ionViewWillEnter(){
    this.currentUser.getUser().then(user =>{
      this.userData = user;
      this.fields = this.utils.getUpdateProfileForm();
    })
  }
  eventAction() {
    console.log( "this.profile", this.profile);
    this.currentUser.getUser().then(user =>{
      this.userData = user;
      this.loader.startLoader();
      const config ={
        url:urlConstants.API_URLS.UPDATE_PROFILE +this.userData._id,
        payload: this.profile
      }
      this.api.post(config).subscribe(resp =>{
          this.loader.stopLoader();
          this.modal.dismiss();
      },error =>{
        this.loader.stopLoader();
      })
    })
    
  }
  close() {
    this.modal.dismiss();
  }
}
