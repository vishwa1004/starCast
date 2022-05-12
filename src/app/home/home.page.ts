import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  posts=[];
  count = 0;
  page = 1;
  type: string;
  subType : string;
  types: any;
  subTypes : any;
  constructor(
    private api: ApiService ,
    private loader: LoaderService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.page =1;
    this.type='';
    this.subType='';
    this.posts =[];
    this.getPosts();
    this.getMeta()
  }
  actions(event){
    console.log(event,"event");
    if(event.action ==  'like'){
      const config={
        url: urlConstants.API_URLS.LIKE_POST +event.post._id
      }
      this.api.get(config).subscribe(resp =>{
        event.post.liked_by =!event.post.liked_by;
      })
    }
  }
  getMeta(){
    const config ={
      url:urlConstants.API_URLS.POST_META
    }
    this.api.get(config).subscribe(resp =>{
      console.log(resp,"resp");
      if(resp.data){
        this.types = resp.data.type;
        this.types.push( {id: "all", value: "All"})
        this.subTypes = resp.data.sub_type;
        this.subTypes.push( {id: "all", value: "All"})

      }
    },error =>{
    })
  }
getPosts(){
    this.loader.startLoader();
    console.log(this.subType,"this.subType");
    this.subType = this.subType == 'all' ?'' :  this.subType;
    this.type = this.type == 'all' ?'' :  this.type;

    const config ={
      url:urlConstants.API_URLS.GET_POSTS+this.page+'&limit=10&type='+this.type+'&sub_type='+this.subType+'&mypost=false'
    }
    this.api.get(config).subscribe(resp =>{
      console.log(resp,"resp");
      if(resp.data){
        this.posts = this.posts.concat(resp.data.data);
        this.count = resp.data.count
      }
    this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })
}

loadMore(event) {
  setTimeout(() => {
    console.log('Done');
    event.target.complete();
    if (this.posts.length === this.count) {
      event.target.disabled = true;
    }else{
      this.page = this.page+1;
      this.getPosts();
    }

  }, 500);
}

toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}

applyFilters(){
  this.posts =[];
  this.page=1;
  this.getPosts();
}
}
