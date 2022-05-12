import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeSelectionPageRoutingModule } from './type-selection-routing.module';

import { TypeSelectionPage } from './type-selection.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    IonicModule,
    TypeSelectionPageRoutingModule
  ],
  declarations: [TypeSelectionPage]
})
export class TypeSelectionPageModule {}
