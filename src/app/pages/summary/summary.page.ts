import { NotificationsService } from './../../services/notifications.service';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  waitersArray = [];
  totalTipsMade: number;
  tipsArray = [];
  constructor(
    private router: Router,
    private storageService: StorageService,
    private storage: Storage,
    private notifcations: NotificationsService,
    private toastController: ToastController,

  ) { }
  ionViewWillEnter() {
    this.storageService.getKeyAsObservable('finalArray').subscribe((waitersList) => {
      this.waitersArray = waitersList;
      waitersList.forEach(element => {
        this.totalTipsMade = element.total_of_the_day;
      });
    });
  }
  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('calculator');
  }
  home() {
    this.storage.ready().then(() => {
      this.notifcations.presentToastWithOptions('Are you sure? - Your data will deteled!')
      .then(() => {
        this.router.navigateByUrl('home');
      });
    });
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            // console.log('Favorite clicked');
            
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
