import { Component, OnInit } from '@angular/core';
import { LoaderService, urlConstants } from '../core';
import { ApiService } from '../core/services/api/api.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage implements OnInit {
  posts=[{
    images:[{image:'assets/images/posts/1.jpg'},
    {image:'assets/images/posts/2.png'},
    {image:'assets/images/posts/3.jpeg'}],
    caption:'My last trip',
    postedBy:'Vishwanath Badiger',
    created_at:'10/04/2022 04:30:12',
    userProfile:'assets/images/posts/3.jpeg',
    liked:true,
    actions:{
      likes:10
    },
    comments:[{
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    },
    {
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    },{
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    },{
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    }]

  },
  {
    images:[{image:'assets/images/posts/1.jpg'}],
    caption:'Yako eno pa',
    postedBy:'Vishwanath Suresh Badiger',
    created_at:'10/04/2022 04:30:12',
    actions:{
      likes:10
    },
    comments:[{
      comment:"Hey mastaiti pa idu Hey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa idu Hey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa iduHey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    },
    {
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    },{
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    },{
      comment:"Hey mastaiti pa idu",
      commentedBy:'Rakesh bhai',
      userProfile:'assets/images/posts/3.jpeg',
    }]
    

  },
  {
    images:[{image:'assets/images/posts/1.jpg'}],
    caption:'Yako eno pa',
    postedBy:'Vishwanath Suresh Badiger',
    created_at:'10/04/2022 04:30:12',
    liked:true,
    userProfile:'',
    actions:{
      likes:10
    }
  },
  {
    images:[],
    caption:"While posting : 1. Image upload/capture option (maximum pics upload should be configurable, 2. first drop-down: Rent/lease/sell  3. drop-down - list of items (camera, light, music instruments etc) 4. Description:  5. Contact Number",
    postedBy:'Vishwanath Suresh Badiger Athani',
    created_at:'10/04/2022 04:30:12',
    liked:true,

    actions:{
      likes:110
    }
  },
  {
    caption:"While posting : 1. Image upload/capture option (maximum pics upload should be configurable, 2. first drop-down: Rent/lease/sell  3. drop-down - list of items (camera, light, music instruments etc) 4. Description:  5. Contact Number",
    postedBy:'No images Vishwanath Suresh Badiger Athani',
    created_at:'2/04/2022 04:30:12',
    userProfile:'assets/images/posts/3.jpeg',
    actions:{
      likes:99900
    }
  },
  {
    images:[{image:'assets/images/posts/1.jpg'}],
    caption:"While posting : 1. Image upload/capture option (maximum pics upload should be configurable, 2. first drop-down: Rent/lease/sell  3. drop-down - list of items (camera, light, music instruments etc) 4. Description:  5. Contact Number",
    postedBy:'Vishwanath Suresh Badiger Athani',
    created_at:'2/04/2022 04:30:12',
    userProfile:'assets/images/posts/3.jpeg',
    actions:{
      likes:0
    }
  },
  {
    images:[{image:'assets/images/posts/1.jpg'},
    {image:'assets/images/posts/2.png'},
    {image:'assets/images/posts/3.jpeg'}],
    created_at:'9/04/2022 04:30:12',
    caption:"While posting : 1. Image upload/capture option (maximum pics upload should be configurable, 2. first drop-down: Rent/lease/sell  3. drop-down - list of items (camera, light, music instruments etc) 4. Description:  5. Contact Number",
    postedBy:'Vishwanath Suresh Badiger Athani',
    userProfile:'assets/images/posts/3.jpeg',
    actions:{
      likes:0
    }
  }]
  constructor(
    private api: ApiService ,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.getPosts();
  }
  actions(event){
  }
getPosts(){
    this.loader.startLoader();
    const config ={
      url:urlConstants.API_URLS.GET_POSTS
    }
    this.api.get(config).subscribe(resp =>{
      if(resp.data){
      }
    this.loader.stopLoader();
    },error =>{
      this.loader.stopLoader();
    })
}
}
