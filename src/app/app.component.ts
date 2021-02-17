import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AppStorageService } from './shared/services/app-storage.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private rout: Router,
    private theme: ThemeService,
    private storageService: AppStorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storageService.getAsObservable('theme').subscribe(theme=>{
        if (theme === 'dark') {
          this.theme.enableDark();
        }
        if (!theme) {
          this.theme.enableLight();
        }
        if (theme === 'light') {
          this.theme.enableLight();
        }
      });
    });
  }

}
