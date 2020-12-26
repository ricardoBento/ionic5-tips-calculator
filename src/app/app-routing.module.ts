import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonNavPage } from './ion-nav/ion-nav.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ion-nav/ion-nav.module').then(m => m.IonNavPageModule),
  },
  // {
  //   path: 'nav', component: IonNavPage,
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
