import { AlertController } from '@ionic/angular';
import { StorageService } from './../../services/storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
declare var $: any;
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  globalWaitersArray: any = [];
  waitersList = [];
  inputTipsToday: number;
  nextValid = false;
  constructor(
    private storage: Storage,
    private router: Router,
    private storageService: StorageService,
    private alert: AlertController
  ) { }
  next() {
    this.calculate();
    this.storage.ready().then(() => {
      this.storage.get('waitersList').then((res) => {
        if (res) {
          this.storage.remove('waitersList').then(() => {
            this.storage.set('finalArray', this.globalWaitersArray).then(() => {
              this.router.navigateByUrl('summary');
            });
          });
        } else {
          this.storage.set('finalArray', this.globalWaitersArray).then(() => {
            this.router.navigateByUrl('summary');
          });
        }
      });
    })
    this.storage.set('finalArray', this.globalWaitersArray).then(() => {
      this.router.navigateByUrl('summary');
    });
  }
  async presentAlert(message) {
    const alert = await this.alert.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  calculate() {
    let totalA;
    let totalB;
    let totalAArray = [];
    let sumTotalA;
    let array = [];
    this.globalWaitersArray.forEach((res, i) => {
      totalA = this.totalA(res.points, res.hours);
      totalAArray.push(totalA);
      sumTotalA = this.sumArray(totalAArray);
      array.push({
        name: res.name,
        points: res.points,
        hours: res.hours,
        totalA: totalA,
      });
    });
    // console.log(this.inputTipsToday);
    if (this.inputTipsToday === null || this.inputTipsToday === undefined) {
      this.presentAlert('Please, add Tips');
    } else {
      totalB = this.totalB(this.inputTipsToday, sumTotalA);
      let totalBArray = [];
      array.forEach(res => {
        totalBArray.push({
          name: res.name,
          points: res.points,
          hours: res.hours,
          totalA: res.totalA,
          totalB: totalB,
        })
      });
      let finalArray = [];
      totalBArray.forEach(element => {
        finalArray.push({
          name: element.name,
          points: element.points,
          hours: element.hours,
          totalA: element.totalA,
          totalB: totalB,
          tips_received: this.tipsReceived(element.totalA, totalB),
        });
      });
      this.globalWaitersArray = finalArray;
      this.nextValid = true;
    }

  }
  ionViewWillEnter() {
    this.nextValid = false;
    this.storageService.getKeyAsObservable('waitersList').subscribe((waitersList) => {
      if (waitersList === null) this.router.navigateByUrl('nav/home');
      else {
        this.globalWaitersArray = [];
        // console.log(waitersList);
        waitersList.forEach(element => {
          this.globalWaitersArray.push({
            name: element.name,
            points: element.points,
            hours: element.hours,
          });
        });
        // console.log(this.globalWaitersArray)
      }
    });
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
  }
  ngAfterViewInit() {
  }
  tipsReceived(totalA, totalB) {
    return totalA * totalB;
  }
  totalA(p, h) {
    //  sum points + hours for each field collumn
    //  then the sum of the row = totalA
    return p + h;
  }
  totalB(tips_input, totalA) {
    // we get the tisp_made_today the divide by totalA row
    // add the totalB to each field collumn
    return tips_input / totalA;
  }
  sumArray(Array) {
    return Array.reduce(function (a, b) {
      return a + b;
    }, 0);
  }
  back() {
    this.storage.remove('waitersList').then(() => {
      this.router.navigateByUrl('setup');
    });
  }
}
