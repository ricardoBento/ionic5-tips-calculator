import { AlertController, PickerController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.page.html',
  styleUrls: ['./form-validation.page.scss'],
})
export class FormValidationPage implements OnInit {
  waitersForm: FormGroup;
  // emailField = FormControl;
  pointsData;
  points = new FormArray([], Validators.compose([Validators.required]));
  pointsErrorMessage = [];
  displayPoints = 1.5;
  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
    private pickerController: PickerController
  ) {
    of(this.getPoints()).subscribe(points => {
      this.pointsData = points;
    });
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
      // points: new FormArray([], Validators.compose([Validators.required])),
      // hours: new FormArray([], Validators.compose([Validators.required])),
    });
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
  runValidation() {
    this.submitForm();
  }
  submitForm() {
    // console.log(this.waitersForm);
    if (this.waitersForm.valid) {
      console.log(this.waitersForm);
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
            // console.log($event);
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
      // console.log(hoursNumber);
      let hoursControl: any = this.getHoursValue(i);
      hoursControl.setValue(hoursNumber);
      hoursControl.markAsTouched({ onlySelf: true });
      console.log(hoursControl);
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
    alert.onDidDismiss().then(() => {
    });
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
}
