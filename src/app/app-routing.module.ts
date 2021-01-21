import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./ion-nav/ion-nav.module').then(m => m.IonNavPageModule),
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./ion-nav/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then(m => m.CalculatorPageModule)
  },
  {
    path: 'setup',
    loadChildren: () => import('./pages/setup/setup.module').then(m => m.SetupPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./pages/summary/summary.module').then(m => m.SummaryPageModule)
  },
  {
    path: 'form-validation',
    loadChildren: () => import('./form-validation/form-validation.module').then( m => m.FormValidationPageModule)
  },
  {
    path: 'ion-nav',
    loadChildren: () => import('./ion-nav/ion-nav.module').then(m => m.IonNavPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
