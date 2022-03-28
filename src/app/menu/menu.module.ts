import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';
import { SharedModule } from '../shared';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MenuPageRoutingModule,
    TranslateModule.forChild()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [MenuPage]
})
export class MenuPageModule {

}
