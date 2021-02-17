import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { WaiterObj } from 'src/app/tabs/tabs.page';
const WAITERS_DATA: WaiterObj[] = [
  { id: 1, name: 'Ricardo', points: 1.5, hours: 9.5 },
  { id: 2, name: 'Mary', points: 2.5, hours: 4 },
  { id: 3, name: 'Joe', points: 0.5, hours: 6.5 },
];
@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements OnInit {
  criteriaData = WAITERS_DATA;
  criterias = [];
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.criterias = this.criteriaData;
    // this.criteriaData = this.navParams.get('card');
  }
  addCriteria() {
    console.log('criteria added!');
  }
  dismiss() {
    let backCard = this.criteriaData;
    this.modalController.dismiss(backCard);
  }
}
