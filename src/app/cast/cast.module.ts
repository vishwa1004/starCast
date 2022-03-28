import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CastPageRoutingModule } from './cast-routing.module';

import { CastPage } from './cast.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule,
    IonicModule,
    CastPageRoutingModule
  ],
  declarations: [CastPage]
})
export class CastPageModule {}
