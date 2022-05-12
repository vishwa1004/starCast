import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.page.html',
  styleUrls: ['./postings.page.scss'],
})
export class PostingsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  count = 0;
  page = 1;
  type: string;
  subType : string;
  types: any;
  subTypes : any;
  posts = [];

  constructor(
    private modal : ModalController,
    private router : Router,
    private loader : LoaderService,
    private api :ApiService,
    private params : ActivatedRoute
  ) { 
   
    params.queryParams.subscribe(resp =>{
      this.page =1;
      this.type='';
      this.subType='';
      this.posts =[];
      this.getPosts();
    })
  }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.page =1;
    this.type='';
    this.subType='';
    this.posts =[];
    this.getPosts();
  }

   createPosts(post){
    this.router.navigate(['menu/type-selection'],{queryParams:{
      post:post
    }})
  }
  getPosts(){
    this.loader.startLoader();
    const config ={
      url:urlConstants.API_URLS.GET_POSTS+this.page+'&limit=10&type='+this.type+'&sub_type='+this.subType+'&mypost=true'
    }
    this.api.get(config).subscribe(resp =>{
      if(resp.data){
        this.posts = this.posts.concat(resp.data.data);
        this.count = resp.data.count
      }
    this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })
}
actions(event){
  if(event.action ==  'like'){
    const config={
      url: urlConstants.API_URLS.LIKE_POST +event.post._id
    }
    this.api.get(config).subscribe(resp =>{
      event.post.liked_by =!event.post.liked_by;
    })
  }
}

loadMore(event) {
  setTimeout(() => {
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
