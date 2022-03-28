import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { ModalController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
import { CurrentUserService } from '../core/services/current-user/current-user.service';
import { LocalStorageService } from '../core/services/local-storage/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  fields = [
   {
    type: "email",
    label: 'LABELS.EMAIL',
    required: true,
    name: 'userName',
    value: '',
    pattern:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    patternError:'LABELS.EMAIL_VALIDATION',
    requiredError:'LABELS.EMAIL_REQUIRED',
    icons: []
  }, 
  {
    type: "password",
    label: 'LABELS.PASSWORD',
    required: true,
    name: 'password',
    requiredError:'LABELS.PASSWORD_REQUIRED',
    value: '',
    icons: []
  }
  ]
  constructor(
    private translate :TranslateService,
    private router : Router,
    private apiService :ApiService,
    public modalController: ModalController,
    public user : CurrentUserService,
    private storage : LocalStorageService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.prepareForm();
  }

  checkPattern(field) {
    if (field.value && field.pattern) {
      let result = field.pattern.test(field.value);
      field.patternMatch = result;
      if (result && field.name == 'mobilenumber') {
        // this.showOtpInput = true;
        // this.registeredMObileNumber = field.value;
      }
    } else {
      // this.showOtpInput = false;
      field.patternMatch = false;
    }
  }

  public prepareForm() {
    const controls = {};
    this.fields.forEach(res => {
      const validationsArray = [];
      if (res.required) {
        validationsArray.push(
          Validators.required
        );
      }
      if (res.pattern) {
        validationsArray.push(
          Validators.pattern(new RegExp(res.pattern))
        );
      }
      controls[res.name] = new FormControl('', validationsArray);
    });
    this.loginForm = new FormGroup(
      controls
    );
  }
  login(){
    console.log(this.loginForm.value,"this.loginForm.value");
    const config ={
      url: urlConstants.API_URLS.LOGIN,
      payload : this.loginForm.value
    }
    this.apiService.guestUser(config).subscribe(resp=>{
      console.log('resp', resp);
    this.setUser(resp.data);
    })
  }
async goToSignup() {
  const modal = await this.modalController.create({
    component: SignupPage,
    cssClass: 'my-custom-class'
  });
  modal.onDidDismiss().then(data =>{
    console.log(data,"data");
    if(data.data){
      this.setUser(data.data.data);
    }
  })
  return await modal.present();
}
setUser(userData){
  this.user.setUser(userData).then(userResp =>{
    console.log(userResp,"resp");
      this.router.navigate(['/menu/tabs/home']);
  })
}
}
