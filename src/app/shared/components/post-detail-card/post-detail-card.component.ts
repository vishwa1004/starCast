import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { urlConstants } from 'src/app/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-post-detail-card',
  templateUrl: './post-detail-card.component.html',
  styleUrls: ['./post-detail-card.component.scss'],
})
export class PostDetailCardComponent implements OnInit {
  @Input() post;
  @Output() actionEvent = new EventEmitter();
  momentInstance = moment;
  newComment: string;
  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 5
  };
  constructor(
    private modal : ModalController,
    private photoViewer: PhotoViewer,
    private api : ApiService
  ){}
  openImage(attachment) {
    console.log(attachment,"attachment");
    // this.photoViewer.show(attachment.url);
    this.photoViewer.show(attachment, '', {share: false});
  }

  ngOnInit() {
    console.log('post', this.post);
  }

  updateLike(post){
      const config={
        url: urlConstants.API_URLS.LIKE_POST +post._id
      }
      this.api.get(config).subscribe(resp =>{
        post.liked_by =!post.liked_by;
      })
  }
  back(){
    this.modal.dismiss();
  }
  postComment(){
    console.log(this.newComment,"newcomment");
  }
}
