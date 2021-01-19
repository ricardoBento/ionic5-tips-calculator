import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.page.html',
  styleUrls: ['./form-validation.page.scss'],
})
export class FormValidationPage implements OnInit {
  loginForm: FormGroup;
  testForm: FormGroup;
  purchaseDataForm;
  errorMessage;
  non_field_errors;
  email_errors;
  message;
  // emailField = FormControl;
  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private storage: Storage,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      // email: this.emailField(["", Validators.compose([Validators.required])]),
      // password: ["", Validators.compose([Validators.required])]
      // email: ["", Validators.compose([Validators.required])],
      // password: ["", Validators.compose([Validators.required])]
      // email: ['', Validators.required],
      // password: ['', [Validators.required, Validators.maxLength(8)]],
    });

  }
  ionViewWillEnter() {
  }
  ionViewDidLoad() {
    // this.loginForm.email.valueChanges.subscribe((res)=>{
    //   console.log(res);
    // });

  }
  ngOnInit() {
    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.onValueChanges();
  }
  onValueChanges(): void {
    this.testForm.valueChanges.subscribe(val => {
      console.log(val);
    });
    this.testForm.controls.name.valueChanges.subscribe(email => {
      console.log('name: ' + email);
    })
  }
  submitTestForm() {
    console.log(this.testForm);
  }
  onSubmit() {
    const logged_user = this.loginForm.value.email;
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      return;
      // this.auth.appLogin(this.loginForm).subscribe(
      //   token => {
      //     if (token) {
      //       this.storage.set("token", token["key"]).then(() => {
      //         this.storage.set("loggedUser", logged_user);
      //         this.router.navigateByUrl("home");
      //       });
      //     } else {
      //       // this.router.navigateByUrl("login");
      //     }
      //   },
      //   error => {
      //     this.handleError(error);
      //   }
      // );
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  handleError(error: HttpErrorResponse) {
    this.non_field_errors = "";
    this.email_errors = "";
    if (error.status === 400 && error.error.non_field_errors) {
      this.non_field_errors = error.error.non_field_errors;
    }
    if (error.status === 400 && error.error.email) {
      this.email_errors = error.error.email;
    }
  }
  register() {
    this.router.navigateByUrl("register");
  }
  passReset() {
    this.router.navigateByUrl("pass-reset");
  }

}
