import { Component, OnInit } from '@angular/core';
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
  // tooltips
  debounce: number = 0;
  duration: number = 3000;
  showArrow: boolean = true;
  showToggleTooltip: boolean = false;
  tooltipEvent: TooltipEvent = TooltipEvent.CLICK;
  btnDisabled = 'true';
  // 
  waitersForm: FormGroup;
  pointsDataInit;
  puntuactions = [];
  waitersName: any = [];
  ordersData = [];
  pointsData = [];
  hoursData = [];
  timeArray: any = [];
  displayHours: any = [];
  displayPoints: any = [];
  hoursFormArray;
  pointsFormArray;
  nextButton = false;
  submitted = false;
  // nameValidation: any;
  // nameValidationMessage;
  validationMessages = [];
  index;
  constructor(
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private pickerController: PickerController,
    public popoverController: PopoverController
  ) {
    this.waitersForm = formBuilder.group({
      waitersList: this.formBuilder.array([
        this.initWaiters(),
      ]),
    });
    of(this.getPoints()).subscribe(points => {
      this.pointsData = points;
    });
  }
  deleteField() {
    console.log('delete field pressed');
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: false
    });
    return await popover.present();
  }
  ionViewWillEnter() {

  }
  checkFormReset() {
    this.storage.get('waitersList').then(list => {
      if (list) this.formReset();
      else;
    });
  }
  initWaiters(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      points: new FormArray([], Validators.compose([Validators.required])),
      hours: new FormArray([], Validators.compose([Validators.required])),
    });
  }
  addNewWaitersField(): void {
    const control = this.waitersForm.controls.waitersList as FormArray;
    control.push(this.initWaiters());
  }
  removeWaitersField(i: number): void {
    const control = this.waitersForm.controls.waitersList as FormArray;
    if (control.length > 1) {
      control.removeAt(i);
    }
    else {
      this.handleErrorAlert('You need at least one waiter..');
    }
  }
  get formData() {
    return this.waitersForm.get('waitersList') as FormArray;
  }
  get formSecondData() {
    return <any>this.waitersForm.get('waitersList');
  }
  get errorCtr(): any {
    return this.waitersForm.controls.waitersList;
  }
  ionLosesFocus($event, i: number) {
    // this.index = i;
    if ($event.target.value === null || $event.target.value === undefined || $event.target.value === '') {
      // this.nameValidation = i;
      // console.log('blur', $event.target.value);
    }
  }
  nameValidatationArray(errMessage, i) {
    // this.nameValidation = i;
  }
  ngOnInit() {
    console.log(this.formData);
  }
  onValueChanges(): void {
    this.waitersForm.controls.name.valueChanges.subscribe(name => {
      // console.log('name: ' + name);
    });
  }
  async submitWaiters() {
    // console.log(this.waitersForm.value.waitersList);
    // console.log(this.waitersForm.controls.waitersList.valid);

    let WaitersArray = [];
    this.waitersForm.value.waitersList.forEach((element, i) => {
      // console.log(element);
      // console.log(element.name);
      let resName = element.name;
      let pointsArray = [];
      // pointsArray.push(element.points);
      let pointsTotal = this.sumPointsArray(element.points[0]);
      console.log(pointsTotal);
      let hoursArray = element.hours[0];


      // WaitersArray.push({
      //   name: element.name,
      //   points: pointsTotal,
      //   hours: hoursArray,
      // });
      // console.log(WaitersArray);
      // this.storage.set('waitersList', WaitersArray).then(() => {
      //   // this.router.navigateByUrl('calculator').then(() => {
      //   // });
      // });
      // }
    });
  }
  async showPicker(i) {
    let picker = await this.pickerController.create({
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => { },
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
              value: 0
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
      this.hoursFormArray = this.waitersForm.controls.waitersList.value[i].hours as FormArray;
      this.hoursFormArray.push(hoursNumber);
      //
      this.displayHours = [];
      let myDisplayHours: any = this.waitersForm.controls.waitersList.value as FormArray;
      myDisplayHours.forEach(element => {
        let myelement = element.hours;
        this.displayHours.push(myelement);
      });
    });
  }
  async presentAlertRadio(i) {


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
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
            let points = $event;
            let sumArray: any = [];
            // pointsArray.push($event);
            // console.log(points, $event);
            this.pointsFormArray = this.waitersForm.controls.waitersList.value[i].points as FormArray;
            this.pointsFormArray.push(points);
            //
            let FormArray = this.waitersForm.controls.waitersList.value[i].points;
            let myDisplayPoints: any = this.waitersForm.controls.waitersList.value as FormArray;
            FormArray.forEach(element => {
              console.log(element);
              sumArray = this.sumPointsArray(element);
              this.displayPoints.push(sumArray);
            });
            console.log(this.displayPoints);
          }
        }
      ],
    });
    alert.present();
    alert.onDidDismiss().then((res) => {
      // console.log(res);
      // this.displayPoints = [];
      // if (this.displayPoints.index !== i) {
      //   this.displayPoints = [];
      //   console.log('display points array reseted');
      // }
      // if(this.displayPoints.index === undefined) {
      //   this.displayPoints = [];
      //   console.log('display points array reseted');
      // }
      // console.log(this.displayPoints.index, i);
    });
  }
  sumPointsArray(array) {
    if (array) {
      let sum = 0;
      let larray = array;
      console.log(larray)
      sum = larray.reduce((a, b) => a + b, 0);
      return sum
    }
    else console.error('no array on sumPointsArray()');
  }
  async Error(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async handleErrorAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  getPoints() {
    return [
      { type: 'checkbox', label: 'Speak English', value: 0.5 },
      { type: 'checkbox', label: 'Answer Phone', value: 0.5 },
      { type: 'checkbox', label: 'Serve Wime', value: 0.5 },
      { type: 'checkbox', label: 'Table Service', value: 0.5 }
    ];
  }
  getCriteria() {
    return [
      { type: 'checkbox', label: 'Worked morning shift', value: 0.5 },
      { type: 'checkbox', label: 'Worked afternoon shift', value: 1 },
      { type: 'checkbox', label: 'Worked evening shift', value: 1 },
    ];
  }
  formReset() {
    this.waitersForm.reset();
  }
  home() {
    this.router.navigateByUrl('home');
  }
}
