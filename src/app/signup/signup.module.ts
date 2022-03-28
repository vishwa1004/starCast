import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [SignupPage]
})
export class SignupPageModule { }
