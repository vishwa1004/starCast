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
        path: 'all-posts',
        loadChildren: () => import('../all-posts/all-posts.module').then( m => m.AllPostsPageModule)
      },
      {
        path: 'create-post',
        loadChildren: () => import('../create-post/create-post.module').then( m => m.CreatePostPageModule)
      },
      {
        path :'type-selection',
        loadChildren:() => import('../type-selection/type-selection-routing.module').then( m => m.TypeSelectionPageRoutingModule)
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
  },
  {
    path: 'type-selection',
    loadChildren: () => import('../type-selection/type-selection.module').then( m => m.TypeSelectionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
