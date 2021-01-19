import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormValidationPageRoutingModule } from './form-validation-routing.module';

import { FormValidationPage } from './form-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormValidationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FormValidationPage]
})
export class FormValidationPageModule {}
