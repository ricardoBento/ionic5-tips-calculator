import { Data } from './home.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild("searchbarElem", { read: ElementRef }) private searchbarElem: ElementRef;

  @HostListener('document:click', ['$event'])
  private documentClickHandler(event) {
    console.log(this.searchbarElem.nativeElement);
  }
  @ViewChild("myButton", { read: ElementRef }) private myButton: ElementRef;

  @HostListener('document:click', ['$event'])
  private buttonHandler(event) {
    console.log(this.myButton.nativeElement, event);
  }

  searchTerm: any = "";
  jsonData: any;
  constructor(
    public navCtrl: NavController,
    public data: Data
  ) { }

  ngOnInit() {
  }
  ionViewDidLoad() {
    this.setFilteredItems();
    console.log(this.searchbarElem.nativeElement);
  }
  setFilteredItems() {
    this.jsonData = this.data.filterItems(this.searchTerm);
  }
}
