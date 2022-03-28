import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttachmentService, LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { CurrentUserService } from '../core/services/current-user/current-user.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  type = 'about';
  profile ={}
userData;
profileMetaData={
  about:[
    {
      key:"name",
      label:"LABELS.NAME"
    },
    {
      key:"email",
      label:"LABELS.EMAIL"
    },
    {
    key:"mobile_number",
    label:"LABELS.MOBILE_NUMBER"
  },
  {
    key:"language",
    label:"LABELS.LANGUAGE"
  },
  {
    key:"specialist_in",
    label:"LABELS.SPECIALIST_IN"
  },
  {
    key:"movies_worked_on",
    label:"LABELS.MOVIES_WORKED_ON"
  },
  {
    key:"serials_worked_on",
    label:"LABELS.SERIALS_WORKED_ON"
  }
  ],
  portfolio:[
    {
      key:"social_media_links",
      label:"LABELS.SOCIAL_LINKS"
    },
    {
      key:"youtube_video_links",
      label:"LABELS.VIDEOS"
    }
  ],
  auditions:{}

}

  constructor(
    private currentUser : CurrentUserService,
    private apiService: ApiService,
    private loader : LoaderService,
    private attachmentService : AttachmentService,
    private modalController:ModalController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.currentUser.getUser().then(user =>{
      this.userData = user;
      this.loader.startLoader();
      this.getProfile();
    })
  }
  segmentChanged(event){
    this.type = event.detail.value;
  }
  profileAction(event) {
    switch (event) {
      case "edit":
        this.update();
        break;
      default:
        break;
    }
  }
  edit(){
    console.log("edit");
  }
  getProfile(){
    const config={
      url:urlConstants.API_URLS.PROFILE+this.userData._id
    }
    this.apiService.get(config).subscribe(resp =>{
      console.log(resp,"resp");
      this.profile = resp.data;
      this.loader.stopLoader();
    },error  =>{
      this.loader.stopLoader();
    })
  }
  upload(){

  }
  async update() {
    const modal = await this.modalController.create({
      component: UpdateProfileComponent,
      componentProps: {
        profile: this.profile
      },
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(data => {
      if(data.data){
        this.syncProfile();
      }
    })
    return await modal.present();
  }
  syncProfile(){
    console.log(this.profile,"this.profile");
  }
}
