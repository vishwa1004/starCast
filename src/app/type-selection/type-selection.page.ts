import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
@Component({
  selector: 'app-type-selection',
  templateUrl: './type-selection.page.html',
  styleUrls: ['./type-selection.page.scss'],
})
export class TypeSelectionPage implements OnInit {
  types;
  subTypes;
  selectedType:any={};
  constructor(
    private router : Router,
    private apiService :ApiService,
    private loader :LoaderService,
  ) { }

  ngOnInit() {
    this.getMeta();
  }
  getMeta(){
    this.loader.startLoader();
    const config ={
      url:urlConstants.API_URLS.POST_META
    }
    this.apiService.get(config).subscribe(resp =>{
      if(resp.data){
        this.types = resp.data.type;
        this.subTypes = resp.data.sub_type;
      }
    this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })
  }
  like(type){
    this.types.forEach(element => {
      element.isCheck = false;
    });
    type.isCheck = !type.isCheck;
    this.selectedType = type;
  }
  next(){
    this.router.navigate(['menu/create-post'],{queryParams:{id : this.selectedType.id, value  : this.selectedType.value}, replaceUrl:true})
  }
}
