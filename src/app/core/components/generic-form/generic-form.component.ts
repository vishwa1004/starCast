import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { langs,states,height,color, urlConstants, regex } from '../../constants';
import { AttachmentService, LoaderService } from '../../services';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnInit {
  @Input() fields:any;
  @Output() eventEmitter = new EventEmitter();
  @Input() data:any;
  @Input() btn;
  @Input() cities;
  languages;
  states;
  colors;
  heights;
  image:any ="../../../../assets/images/blank_profile.png";
  isUploaded = false;
  emailPattern : boolean = true;
  namePattern: boolean = true;
  mobilePattern: boolean = true;
  constructor(
    private api:ApiService,
    private attachmentService : AttachmentService,
    private loader : LoaderService
  ) { }
  genericForm: FormGroup;
  // fields = [
  //  {
  //   type: "email",
  //   label: 'LABELS.EMAIL',
  //   required: true,
  //   name: 'userName',
  //   value: '',
  //   pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  //   patternError:'LABELS.EMAIL_VALIDATION',
  //   requiredError:'LABELS.EMAIL_REQUIRED',
  //   icons: []
  // }, 
  // {
  //   type: "password",
  //   label: 'LABELS.PASSWORD',
  //   required: true,
  //   name: 'password',
  //   requiredError:'LABELS.PASSWORD_REQUIRED',
  //   value: '',
  //   icons: []
  // }
  // ]
  ngOnInit() {
    if(this.data.state){
      this.getCity();
    }
    this.getData();
  }
 
  getData(){
   this.languages =langs;
   this.states =states;
   this.heights = height;
   this.colors = color;
   if(this.data.profile_photo &&  this.data.profile_photo.value){
      this.isUploaded = true;
   }else{
    this.isUploaded = false;
   }
  }
  getCity(){
   this.loader.startLoader();
   const config ={
     url:urlConstants.API_URLS.CITIES,
     payload:{
        "state":this.data.state
       }
   }
   this.api.post(config).subscribe(resp =>{
    this.loader.stopLoader();
     if(resp.data){
      this.cities = resp.data;
     }
   },error=>{
    this.loader.stopLoader();
   })
  }
  action(){
    this.eventEmitter.emit(this.data);
  }
  chooseImgae(){
    this.attachmentService.selectImage().then((image:any) =>{
      if(image.data && image.data.value){
        if(this.data.profile_photo){
          this.data.profile_photo.value = image.data.value;
          this.data.profile_photo.type ='png';
        }else{
          this.data.profile_photo={
            value : image.data.value,
            type:'png',
          }
        }
        this.image="data:image/jpeg;base64,"+ image.data.value;
        this.isUploaded = false;
      }
    })
  }
  validate(value,type){
    if (value) {
      let result = regex[type].test(value);
      if(type == 'email'){
        this.emailPattern= result;
      }else if(type == 'name'){
        this.namePattern= result;
      }else{
        this.mobilePattern= result;
      }
    } else {
      // this.showOtpInput = false;
      if(type == 'email'){
        this.emailPattern= true;
      }else if(type == 'name'){
        this.namePattern= true;
      }else{
        this.mobilePattern= true;
      }
    }
  }
}
