import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class PwaListenersService {
  promptEvent;
  actionSheet
  constructor(
    private platform: Platform,
    public actionSheetController: ActionSheetController,
    private updates: SwUpdate
  ) { }
  public initPwaPrompt() {
    if (this.platform.is('desktop')) {
      window.addEventListener('beforeinstallprompt', ($event: any) => {
        console.log('desktop');
        $event.preventDefault();
        this.promptEvent = $event;
        this.presentActionSheet($event);
      });
    }
    if (this.platform.is('android')) {
      window.addEventListener('beforeinstallprompt', ($event: any) => {
        console.log('android');
        $event.preventDefault();
        this.promptEvent = $event;
        this.presentActionSheet($event);
      });
    }
    if (this.platform.is('ios')) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        window.addEventListener('beforeinstallprompt', ($event: any) => {
          console.log('ios');
          $event.preventDefault();
          this.promptEvent = $event;
          this.presentActionSheet($event);
        });
      }
    }
  }
  async presentActionSheet($event?) {
    this.actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-pwa-install-class',
      buttons: [
        {
          text: 'Add to Home Screen',
          icon: 'home',
          role: 'destructive',
          handler: () => {
            this.presentAddToHome($event);
            this.actionSheet.dismiss();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        }]
    });
    await this.actionSheet.present();
  }
  public async presentAddToHome($event?) {
    $event.prompt();
    this.actionSheet.dismiss();
    $event.userChoice.then((choiceResult) => {
      // if (choiceResult.outcome === 'accepted') {
      //   console.log('User accepted the A2HS prompt');
      //   // this.actionSheet.dismiss();
      // }
      // else {
      //   console.log('User dismissed the A2HS prompt');
      //   // this.actionSheet.dismiss();
      // }
      $event = null;
    });
    // this.actionSheet.dismiss();
  }
}