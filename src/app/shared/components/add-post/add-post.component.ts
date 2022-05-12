import { Component, OnInit,Input } from '@angular/core';
import { AttachmentService } from 'src/app/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
@Input() post : any;
  constructor(
    private attachmentService : AttachmentService
  ) { }

  ngOnInit() {}
  selectImage(){
    this.attachmentService.selectImage().then(resp =>{
      console.log(resp,"resp");
      this.post.images.push(resp.data);
    })
  }
}
