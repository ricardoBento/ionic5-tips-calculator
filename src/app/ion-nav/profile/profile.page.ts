import { StorageService } from './../../services/storage.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private storageService: StorageService
  ) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storageService.getKeyAsObservable('').subscribe((data) => {
      console.log(data);
    })
  }
  ionViewDidLoad() {
  }
}
