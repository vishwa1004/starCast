import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostingsPageRoutingModule } from './postings-routing.module';

import { PostingsPage } from './postings.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    IonicModule,
    PostingsPageRoutingModule
  ],
  declarations: [PostingsPage]
})
export class PostingsPageModule { }
