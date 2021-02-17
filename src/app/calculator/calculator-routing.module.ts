import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorPage } from './calculator.page';

const routes: Routes = [
  {
    path: '',
    component: CalculatorPage
  },
  // {
  //   path: 'popover',
  //   loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorPageRoutingModule {}
