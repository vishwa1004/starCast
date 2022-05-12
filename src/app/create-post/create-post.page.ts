import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AttachmentService, LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  postForm : FormGroup;
  types: any =[];
  subTypes: any =[];
  fields = [
  //  {
  //   type: "select",
  //   label: 'LABELS.TYPE',
  //   required: true,
  //   name: 'type',
  //   value: '',
  //   options: [],
  //   requiredError:'LABELS.TYPE_REQUIRED',
  //   icons: []
  // }, 
  {
    type: "select",
    label: 'LABELS.CATEGORY',
    required: true,
    name: 'sub_types',
    options:[],
    requiredError:'LABELS.CATEGORY_REQUIRED',
    value: '',
    icons: []
  },{
    type: "number",
    label: 'LABELS.CONTACT_NUMBER',
    required: true,
    name: 'contact_number',
    pattern: /^((\\+[0-9]{0,2}-?)|0)?[0-9]{10}$/,
    value: '',
    maxLength:10,
    patternError:'LABELS.MOBILE_NUMBER_VALIDATION',
    requiredError:'LABELS.MOBILE_NUMBER_REQUIRED',
    icons: [
    ]
  },{
    type: "textArea",
    label: 'LABELS.DESCRIPTION',
    required: true,
    name: 'description',
    requiredError:'LABELS.DESCRIPTION_REQUIRED',
    value: '',
    icons: []
  }
  ];
  images : any =[];
  selectedType={id:'',value:''};
  uploadedImages : any =[];

  constructor(
    private translate :TranslateService,
    private router : Router,
    private activateRouter : ActivatedRoute,
    private apiService :ApiService,
    public modalController: ModalController,
    private loader :LoaderService,
    private attachmentSertvice:AttachmentService,
    private alert : AlertController,
    private photoViewer : PhotoViewer,
    private location : Location  
  ) {
    activateRouter.queryParams.subscribe(params =>{
      console.log(params.type,"params");
      this.selectedType.id=params.id;
      this.selectedType.value=params.value;
    })
   }

  ngOnInit() {
    this.getMeta();
  }
  getMeta(){
    this.loader.startLoader();
    const config ={
      url:urlConstants.API_URLS.POST_META
    }
    this.apiService.get(config).subscribe(resp =>{
      console.log(resp,"resp");
      if(resp.data){
        this.types = resp.data.type;
        this.subTypes = resp.data.sub_type;
        this.prepareForm();
      }
    this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })
  }
  checkPattern(field) {
    console.log(field.pattern,"field",this.postForm.value[field.name]);
    if (this.postForm.value[field.name] && field.pattern) {
      let result = field.pattern.test(this.postForm.value[field.name]);
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
      if(res.name == 'type'){
          res.options = this.types;
      }
      if(res.name == 'sub_types'){
        res.options = this.subTypes;
    }
    
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
    this.postForm = new FormGroup(
      controls
    );
  }
  upload(){
    this.attachmentSertvice.selectImage().then(data => {
      if(data.data){
        this.images.push(data.data);
        let copyObj = JSON.parse(JSON.stringify(data))
        copyObj.data.value = 'data:image/png;base64,' + copyObj.data.value;
        this.uploadedImages.push(copyObj.data);
        console.log( this.uploadedImages," this.uploadedImages", this.images);
      }
    })
  }
  delete(i){
    this.uploadedImages.splice(i,1);
    this.images.splice(i,1);
  }
  async deleteConfirmation(i) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      subHeader: '',
      message: 'Do you want to delete this image?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
           this.delete(i);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  open(url){
    this.photoViewer.show(url);
  }
submit(){
  this.loader.startLoader();
  this.postForm.value.type = this.selectedType;
  const config ={
    url:urlConstants.API_URLS.CREATE_POST,
    payload:this.postForm.value
  }
  this.apiService.post(config).subscribe(resp =>{
    console.log(resp,"resp");
    if(resp.status == 200){
      if(this.images.length){
        this.imageUpload(resp.data);
      }else{
        this.location.back();
      }
    }
  this.loader.stopLoader();
  },error =>{
    this.loader.stopLoader();
  })
}
imageUpload(data){
  this.loader.startLoader();
  const config ={
    url:urlConstants.API_URLS.POST_IMAGE+data._id,
    payload:{images :this.images}
  }
  this.apiService.post(config).subscribe(resp =>{
    console.log(resp,"resp");
    if(resp.data){
      this.location.back();
    }
  this.loader.stopLoader();
  },error =>{
    this.loader.stopLoader();
  })
}
}
