import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  fields = [ {
    type: "text",
    label: 'LABELS.NAME',
    required: true,
    name: 'name',
    pattern: /^[a-zA-Z\s]*$/,
    value: '',
    patternError:'LABELS.NAME_VALIDATION',
    requiredError:'LABELS.NAME_REQUIRED',
    icons: [
    ]
  },{
    type: "number",
    label: 'LABELS.MOBILE_NUMBER',
    required: true,
    name: 'mobile_number',
    pattern: /^((\\+[0-9]{0,2}-?)|0)?[0-9]{10}$/,
    value: '',
    maxLength:10,
    patternError:'LABELS.MOBILE_NUMBER_VALIDATION',
    requiredError:'LABELS.MOBILE_NUMBER_REQUIRED',
    icons: [
    ]
  }, {
    type: "email",
    label: 'LABELS.EMAIL',
    required: true,
    name: 'email',
    value: '',
    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    patternError:'LABELS.EMAIL_VALIDATION',
    requiredError:'LABELS.EMAIL_REQUIRED',
    icons: []
  }, {
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
    private translate: TranslateService,
    private apiService: ApiService,
    private modal: ModalController,
    private loader : LoaderService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.prepareForm();
  }

  checkPattern(field) {
    console.log(field.pattern,"field",this.signupForm.value[field.name]);
    if (this.signupForm.value[field.name] && field.pattern) {
      let result = field.pattern.test(this.signupForm.value[field.name]);
      field.patternMatch = result;
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
    this.signupForm = new FormGroup(
      controls
    );
  }
  signup() {
    this.loader.startLoader();
    const config = {
      url: urlConstants.API_URLS.REGISTER,
      payload: this.signupForm.value
    }
    this.apiService.guestUser(config).subscribe(resp => {
      console.log('resp', resp);
      if(resp.data){
        this.modal.dismiss(resp);
      }
    this.loader.stopLoader();
     
    },error =>{
    this.loader.stopLoader();
    })
  }
  close() {
    this.modal.dismiss();
  }
}
