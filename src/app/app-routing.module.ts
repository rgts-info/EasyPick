import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // START: REMARK-11042022: Default routing
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  // },
  // END: REMARK-11042022: Default routing
  {
    path: '',
    loadChildren: () => import('./pages/banner/banner.module').then( m => m.BannerPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
