import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormValidationPage } from './form-validation.page';

const routes: Routes = [
  {
    path: '',
    component: FormValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormValidationPageRoutingModule {}
