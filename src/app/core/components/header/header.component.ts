import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NotificationService } from '../../services';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() showMenu: boolean = false;
  @Input() showEdit: string;
  @Output() onAction = new EventEmitter();
  constructor(
    private notificationServ: NotificationService,
    private alert: AlertController
  ) { }

  ngOnInit() { }
  actions(type) {
    this.onAction.emit(type);
  }
}
