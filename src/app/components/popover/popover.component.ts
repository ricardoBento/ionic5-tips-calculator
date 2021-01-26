import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, PickerController, PopoverController } from '@ionic/angular';
import { SetupPage } from 'src/app/pages/setup/setup.page';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(
    private router: Router,
    private setup: SetupPage,
    public formBuilder: FormBuilder,
    private storage: Storage,
    public alertController: AlertController,
    private pickerController: PickerController,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() { }

  home() {
    this.router.navigateByUrl('ion-nav/nav/home')
  }
  
  dismiss() {
    this.popoverCtrl.dismiss().then(() => this.home());
  }
}
