import { AppStorageService } from './../shared/services/app-storage.service';
import { Component } from '@angular/core';


export interface WaiterObj {
  id: number;
  name: string;
  points: number;
  hours: number;
}

const WAITERS_DATA: WaiterObj[] = [
  { id: 1, name: 'Ricardo', points: 1.5, hours: 9.5 },
  { id: 2, name: 'Mary', points: 2.5, hours: 4 },
  { id: 3, name: 'Joe', points: 0.5, hours: 6.5 },
];

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  waitersSource = WAITERS_DATA;
  badges: boolean = false;
  badges_count: number;

  constructor(
    private storageService: AppStorageService
  ) {
  }
  ionViewWillEnter() {
    this.waitersSource.forEach((element: any) => {
      // console.log(element.length)
      // this.badges = element.length;
      // this.badges_count = element.length;
      this.badges = true;
    });
    this.badges_count = this.waitersSource.length;
    // console.log(this.waitersSource.length)
  }
}
