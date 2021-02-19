import { OnDestroy } from '@angular/core';
import { AppStorageService } from './../shared/services/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CriteriaComponent } from './criteria/criteria.component';
import { Route, Router } from '@angular/router';
import { PopoverPage } from './popover/popover.page';
import { WaiterObj } from '../pages/profile/profile.page';
import { BehaviorSubject } from 'rxjs';
// import { PopoverComponent } from './popover/popover.component';
const CRITERIA_DATA: any[] = [
  { id: 1, criteria: 'Speak English', value: 0.5 },
  { id: 2, criteria: 'Answer phone', value: 0.5 },
  { id: 3, criteria: 'Serve Wine', value: 0.5 },
];

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit, OnDestroy {
  next_disabled: boolean = true;
  // 
  add_criteria: boolean = false;
  criteria_disabled: boolean = true;
  // 
  edit_disabled: boolean = true;
  // 
  criteria_list: boolean = true;
  edit_criteria: boolean = true;
  // 
  dataObservable: Subscription;
  data = [];
  private criterias_data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private modalController: ModalController,
    private appStorage: AppStorageService,
    private router: Router,
    public popoverController: PopoverController
  ) {
    this.data = [];
  }
  ngOnInit() {
  }
  populateCriteria() {
    let message = CRITERIA_DATA;
    this.appStorage.saveStorage('criteriaObj', message).then(() => {
      this.criterias_data.next(message);
      this.add_criteria = false;
      // this.next_disabled = false;
      // this.criteria_disabled = false;
      // this.add_criteria = false;
    });
  }
  ionViewWillEnter() {
    this.loadCriteriaFromStorage().subscribe(criterias => {
      // console.log(criterias);
      if (criterias) {
        // this.criteria_list = false;
        this.criterias_data.next(criterias);
      }
      if (!criterias) {
        let message: any = 'Criterias is null or undefined';
        this.criterias_data.next(message);
        // this.criteria_list = true;
      }
    });
  }
  // addCriteria() {
  //   this.detailsModal();
  // }
  async editCriteria() {
    const modal = await this.modalController.create({
      component: CriteriaComponent,
      cssClass: 'criteria-class',
    });
    await modal.present().then(() => {
    });
  }
  async addCriteria() {
    let Add: any = 'add';
    const modal = await this.modalController.create({
      component: CriteriaComponent,
      cssClass: 'criteria-class',
      componentProps: Add,
    });
    await modal.present().then(() => {
    });
    await modal.onDidDismiss().then((data) => {
      // console.log(data);
      this.appStorage.saveStorage('criteriaObj', data.data).then(() => {
        this.loadCriteriaFromStorage().subscribe(criterias => {
          if (criterias) {
            this.criterias_data.next(criterias);
            this.add_criteria = true;
          }
        });
      });
    });
  }
  loadCriteriaFromStorage() {
    return this.appStorage.getAsObservable('criteriaObj');
  }
  ngOnDestroy() {
    // this.dataObservable.unsubscribe();
  }
  home() {
    this.router.navigateByUrl('tabs/home')
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'popover-class',
      event: ev,
      translucent: true,
      showBackdrop: true
    });
    return await popover.present();
  }
}
