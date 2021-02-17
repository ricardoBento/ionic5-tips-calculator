import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private alertController: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() { }
  async home() {
    this.dismissPopOver();
    let message = 'Are you sure, this will clear your Storage DB!'
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('tabs/home').then(() => {
              this.storage.clear();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async dismissPopOver() {
    await this.popoverController.dismiss();
  }
}
