import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  waitersArray = [];
  constructor(
    private router: Router,
    private storageService: StorageService,
    private storage: Storage,
  ) { }
  ionViewWillEnter() {
    this.storageService.getKeyAsObservable('finalArray').subscribe((waitersList) => {
      this.waitersArray = waitersList;
    });
  }
  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('calculator');
  }
  home() {
    this.storage.ready().then(() => {
      this.storage.remove('finalArray').then(() => {
        this.storage.clear().then(() => {
          this.router.navigateByUrl('nav/home');
        });
      });
    });
  }
}
