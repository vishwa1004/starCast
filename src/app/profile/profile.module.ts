import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';
import { FormBuilder } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  providers:[FormBuilder],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
