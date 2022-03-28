import { Component, OnInit } from '@angular/core';
import { urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { CurrentUserService } from '../core/services/current-user/current-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  type = 'about';
profile ={
  "name":"abc",
  "email":"email",
  "mobile_number":"9591553529",
  "password":"abcdef",
}
userData;
profileMetaData=[{
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
]
  constructor(
    private currentUser : CurrentUserService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.currentUser.getUser().then(user =>{
      this.userData = user;
      this.getProfile();
    })
  }
  segmentChanged(event){
    this.type = event.detail.value;
  }
  profileAction(event) {
    switch (event) {
      case "edit":
        this.edit();
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
    })
  }
}
