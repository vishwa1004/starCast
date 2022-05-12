import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  noProfile : boolean = false;
  portfolio=[];
  cities;
  image:any ="../../../../assets/images/blank_profile.png";
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
    key:"city",
    label:"LABELS.CITY"
  },
  {
    key:"state",
    label:"LABELS.STATE"
  },
  {
    key:"color",
    label:"LABELS.COLOR"
  },
  {
    key:"height",
    label:"LABELS.HEIGHT"
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
    private modalController:ModalController,
    private alert : AlertController
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
    if( event.detail.value == 'portfolio'){
      this.getGallery();
    }
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

  getProfile(){
    const config={
      url:urlConstants.API_URLS.PROFILE+this.userData._id
    }
    this.apiService.get(config).subscribe(resp =>{
      this.loader.stopLoader();
      if(resp.data){
       this.noProfile = false;
      this.profile = resp.data;
     }else {
       this.noProfile = true;
     }
    },error  =>{
      this.loader.stopLoader();
    })
  }

  upload(){
    this.attachmentService.selectImage().then(data => {
      if(data.data){
        this.syncProfileImage(data.data);
      }
    })
  }

  async update() {
    const modal = await this.modalController.create({
      component: UpdateProfileComponent,
      componentProps: {
        profile: this.profile,
        cities: await this.getCities()
      },
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(data => {
      this.getProfile();
    })
    return await modal.present();
  }

  getCities(){
    console.log(this.profile['state'],"this.profile['state']");
    if(this.profile['state']){
      this.loader.startLoader();
      const config ={
        url:urlConstants.API_URLS.CITIES,
        payload:{
           "state":this.profile['state']
          }
      }
      this.apiService.post(config).subscribe(resp =>{
       this.loader.stopLoader();
        if(resp.data){
         return resp.data;
        }else{
          return '';
        }
      },error=>{
       this.loader.stopLoader();
      })
    }
  }
  syncProfileImage(image){
    let images:any={
      images:[
        image
      ]
    };
    this.loader.startLoader();
    const config ={
      url : urlConstants.API_URLS.UPLOAD_IMAGE+this.userData._id,
      payload:images
    }
    this.apiService.post(config).subscribe(resp =>{
      console.log(resp,"resp");
      this.getGallery();
      this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })
  }

  syncProfile(){
    console.log(this.profile,"this.profile");
  }

  async deleteConfirmation(attachment) {
    const alert = await this.alert.create({
      cssClass: 'attachment-delete-alert',
      message: 'Do you want to delete this image?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.deleteAttachment(attachment);
          },
        }, {
          text: 'No',
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {

          },
        },
      ],
    });
    await alert.present();
  }
  deleteAttachment(attachment){
    console.log(attachment)
  }

  getGallery(){
    this.loader.startLoader();
    const config ={
      url : urlConstants.API_URLS.DOWNLOAD_IMAGE+this.userData._id,
    }
    this.apiService.get(config).subscribe(resp =>{
      console.log(resp,"resp");
     if(resp.data.images &&resp.data.images.length){
      this.portfolio=resp.data.images;
     }
      this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })

  }
}
