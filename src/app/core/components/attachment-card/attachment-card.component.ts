import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform } from '@ionic/angular';
// import { File } from "@ionic-native/file/ngx";

@Component({
  selector: 'app-attachment-card',
  templateUrl: './attachment-card.component.html',
  styleUrls: ['./attachment-card.component.scss'],
})
export class AttachmentCardComponent implements OnInit {
  @Input() data: any;
  @Input() viewOnly: any;
  @Output() deleteAttachment = new EventEmitter()
  limit = 2;
  path;
  constructor(
    private sanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
  ) {}

  ngOnInit() {
  }

  getImgContent(file) {
    return this.sanitizer.bypassSecurityTrustUrl(file);
  }
  delete(data, index) {
    this.deleteAttachment.emit({ data: data, index: index });
  }
  loadMore(){
    this.limit=this.data.attachments.length;
  }
  open(url){
    this.photoViewer.show(url);
  }

  viewDocument(attachment) {
     this.openImage(attachment);
  }
 
  openImage(attachment) {
    this.photoViewer.show(attachment.url);
  }
}
