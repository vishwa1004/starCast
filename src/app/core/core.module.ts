import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentCardComponent, HeaderComponent, LogoComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {FilterPipe} from './pipes';

@NgModule({
  declarations: [HeaderComponent,FilterPipe,LogoComponent,AttachmentCardComponent],
  exports: [HeaderComponent,FilterPipe, RouterModule, LogoComponent,AttachmentCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CoreModule { }
