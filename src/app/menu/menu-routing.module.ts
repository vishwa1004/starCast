import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: "",
        loadChildren: () => import("../tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: "tabs",
        loadChildren: () => import("../tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: '',
        redirectTo: 'menu/tabs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
