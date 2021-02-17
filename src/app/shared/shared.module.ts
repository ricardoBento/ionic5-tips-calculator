import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { PipesModule } from './pipes/pipes.module';
import { NgxIonicImageViewerModule } from './components/ngx-ionic-image-viewer/src/public-api';
import { LogoGridComponent } from './components/logo-grid/logo-grid.component';
import { ImgBackgroundComponent } from './components/img-background/img-background.component';
import { TweetComponent } from './components/tweet/tweet.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    NgxIonicImageViewerModule,
  ],
  entryComponents: [
    LogoGridComponent,
    ImgBackgroundComponent
  ],
  declarations: [
    AppHeaderComponent,
    LogoGridComponent,
    ImgBackgroundComponent,
    TweetComponent
  ],
  exports: [
    AppHeaderComponent,
    PipesModule,
    NgxIonicImageViewerModule,
    LogoGridComponent,
    ImgBackgroundComponent,
    TweetComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
