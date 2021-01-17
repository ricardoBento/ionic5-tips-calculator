import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private storage: Storage,
  ) { }
  ionViewWillEnter() {
    this.storage.ready().then(()=>{
      console.log('ready');
      this.storage.clear().then(()=>{
        console.log('cleared');
      });
    })
    
  }
  calculatorPage() {
    this.router.navigateByUrl('calculator');
  }
  setupPage() {
    this.router.navigateByUrl('setup');
  }
}
