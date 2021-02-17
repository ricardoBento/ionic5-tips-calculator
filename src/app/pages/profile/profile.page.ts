import { AppStorageService } from './../../shared/services/app-storage.service';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
];
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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'points', 'hours'];
  dataSource = ELEMENT_DATA;
  waitersSource = WAITERS_DATA;
  savedTheme;
  constructor(
    private theme: ThemeService,
    private storageService: AppStorageService
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.storageService.getAsObservable('theme').subscribe(theme => {
      if (theme === 'dark') {
        this.theme.enableDark();
        this.savedTheme = true;
      }
      if (!theme) {
        this.theme.enableLight();
        this.savedTheme = false;
      }
      if (theme === 'light') {
        this.theme.enableLight();
        this.savedTheme = false;
      }
    });
  }
  update(e) {
    e.detail.checked ? this.enableDark() : this.enableLight()
  }
  enableDark() {
    this.theme.enableDark();
    this.storageService.saveStorage('theme', 'dark');
  }
  enableLight() {
    this.theme.enableLight();
    this.storageService.saveStorage('theme', 'light');
  }
}
