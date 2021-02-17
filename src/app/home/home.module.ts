import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedComponentsModule,
    SharedDirectivesModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
