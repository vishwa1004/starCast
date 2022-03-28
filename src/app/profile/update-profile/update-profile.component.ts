import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  fields;
  constructor(
    private utils: UtilsService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.fields = this.utils.getUpdateProfileForm();
    console.log(this.fields, "this.field");
  }

  eventAction(event) {
    console.log(event, "event");
  }
  close() {
    this.modal.dismiss();
  }
}
