import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeSelectionPage } from './type-selection.page';

const routes: Routes = [
  {
    path: '',
    component: TypeSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeSelectionPageRoutingModule {}
