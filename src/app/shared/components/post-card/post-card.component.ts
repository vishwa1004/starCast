import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { PostDetailCardComponent } from '../post-detail-card/post-detail-card.component';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
@Input() post;
@Output() actionEvent = new EventEmitter();
momentInstance = moment;

sliderConfig = {
  slidesPerView: 1,
  spaceBetween: 5
};

  constructor(
    private modal : ModalController,
    private photoViewer: PhotoViewer,
  ) { }

  ngOnInit() {
    console.log(this.post,"post");
  }
  updateLike(post){
  post.liked =  !post.liked;
  let action={
    action:'like',
    post:post
  }
  this.actionEvent.emit(action);
  }

  async openPost(post){
    const modal = await this.modal.create({
      component: PostDetailCardComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      post :this.post
      }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
       console.log(data.data,"data.data");
      }
    })
    return await modal.present();
  }
  openImage(attachment) {
    console.log(attachment,"attachment");
    // this.photoViewer.show(attachment.url);
    this.photoViewer.show(attachment, '', {share: false});
  }
  async postDetails(post){
    const modal = await this.modal.create({
      component: PostDetailCardComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      post : post
      }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
       console.log(data.data,"data.data");
      }
    })
    return await modal.present();
  }
}
