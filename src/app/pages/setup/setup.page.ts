import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, PickerController, ModalController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";
import { Observable, from, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { TooltipEvent } from 'src/app/components/ionic4-tooltips/src/models/tooltip-event.model';
export interface PickerColumn {
  name: string;
  align?: string;
  selectedIndex?: number;
  prevSelected?: number;
  prefix?: string;
  suffix?: string;
  options: PickerColumnOption[];
  cssClass?: string | string[];
  columnWidth?: string;
  prefixWidth?: string;
  suffixWidth?: string;
  optionsWidth?: string;
  refresh?: () => void;
}
export interface PickerColumnOption {
  text?: string;
  value?: any;
  disabled?: boolean;
  duration?: number;
  transform?: string;
  selected?: boolean;
}
@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  waitersForm: FormGroup;
  pointsData;
  points = new FormArray([], Validators.compose([Validators.required]));
  pointsErrorMessage = [];
  displayPoints = 1.5;
  constructor(
    public formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
    private pickerController: PickerController
  ) {
    of(this.getPoints()).subscribe(points => {
      this.pointsData = points;
    });
  }
  home() {
    this.router.navigateByUrl('ion-nav/nav/home');
  }
  ionViewWillEnter() { }
  ionViewDidLoad() { }
  ngOnInit() {
    this.waitersForm = this.formBuilder.group({
      waitersList: this.formBuilder.array([
        this.initWaiters(),
      ]),
    });
    this.onValueChanges();
  }
  onValueChanges(): void {
    this.waitersListValues.valueChanges.subscribe((val) => {
      // console.log(val);
    });
  }
  initWaiters(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      points: new FormControl('', Validators.compose([Validators.required])),
      hours: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  get waitersListValues() {
    return this.waitersForm.get('waitersList') as FormArray;
  }
  get formData() {
    return this.waitersForm.get('waitersList') as FormArray;
  }
  formDataId(i): any {
    return this.formData.controls[i] as FormArray;
  }
  //
  get waitersListControl() {
    return this.waitersForm.get('waitersList') as FormArray;
  }
  get errorCtr(): any {
    return this.waitersForm.controls.waitersList;
  }
  getPointValue(i) {
    return this.errorCtr.controls[i].get('points');
  }
  getHoursValue(i) {
    return this.errorCtr.controls[i].get('hours');
  }
  submitForm() {
    if (this.waitersForm.valid) {
      let form = this.formData.value;
      this.storage.set('waitersList', form).then((res) => {
        console.log(res);
        this.router.navigateByUrl('calculator');
      });
    } else {
      this.handleErrorAlert('All form must be filled');
    }
  }
  async addHours(i) {
    let picker = await this.pickerController.create({
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: ($event) => {
          },
        }
      ],
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            },
            {
              text: '6',
              value: 6
            },
            {
              text: '7',
              value: 7
            },
            {
              text: '8',
              value: 8
            },
            {
              text: '9',
              value: 9
            },
            {
              text: '10',
              value: 10
            },
            {
              text: '11',
              value: 11
            },
            {
              text: '12',
              value: 12
            },
            {
              text: '13',
              value: 13
            },
          ]
        },
        {
          name: 'quarters',
          options: [
            {
              text: '00',
              value: 0o0
            },
            {
              text: '25',
              value: 25
            },
            {
              text: '50',
              value: 50
            },
            {
              text: '75',
              value: 75
            },
          ]
        }
      ],
    });
    picker.present();
    picker.onDidDismiss().then(async () => {
      const hours = await picker.getColumn('hours');
      const quarters = await picker.getColumn('quarters');
      let selectedHour = hours.options[hours.selectedIndex].value;
      let selectedMinutes = quarters.options[quarters.selectedIndex].value;
      let hoursString: any = [`${selectedHour}.${selectedMinutes}`];
      let hoursNumber = parseFloat(hoursString);
      let hoursControl: any = this.getHoursValue(i);
      hoursControl.setValue(hoursNumber);
      hoursControl.markAsTouched({ onlySelf: true });
    });
  }
  async addPoints(i) {
    const alert = await this.alertController.create({
      inputs: this.pointsData,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Ok',
          handler: ($event) => {
            let points: number;
            points = this.sumPointsArray($event);
            let pointsControl: any = this.getPointValue(i);
            pointsControl.setValue(points);
            pointsControl.markAsTouched({ onlySelf: true });
          }
        }
      ],
    });
    alert.present();
  }
  sumPointsArray(array) {
    if (array) {
      let sum = 0;
      let larray = array;
      // console.log(larray)
      sum = larray.reduce((a, b) => a + b, 0);
      return sum
    }
    else console.error('no array on sumPointsArray()');
  }
  resetForm() {
    this.waitersForm.reset();
  }
  getPoints() {
    return [
      { type: 'checkbox', label: 'Speak English', value: 0.5 },
      { type: 'checkbox', label: 'Answer Phone', value: 0.5 },
      { type: 'checkbox', label: 'Serve Wime', value: 0.5 },
      { type: 'checkbox', label: 'Table Service', value: 0.5 }
    ];
  }
  async handleErrorAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  add() {
    const control = this.waitersForm.controls.waitersList as FormArray;
    control.push(this.initWaiters());
  }
  remove(i: number): void {
    const control = this.waitersForm.controls.waitersList as FormArray;
    if (control.length > 1) {
      control.removeAt(i);
    } else {
      this.handleErrorAlert('You need at least one waiter..');
    }
  }
}
