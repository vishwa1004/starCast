import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AddPostComponent, DashboardCardComponent, PostCardComponent, PostDetailCardComponent } from './components';

@NgModule({
  declarations: [
    DashboardCardComponent,PostCardComponent,PostDetailCardComponent,AddPostComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    TranslateModule,DashboardCardComponent,PostCardComponent,PostDetailCardComponent,AddPostComponent
  ]
})
export class SharedModule { }