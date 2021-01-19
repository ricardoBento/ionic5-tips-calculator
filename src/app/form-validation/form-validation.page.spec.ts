import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormValidationPage } from './form-validation.page';

describe('FormValidationPage', () => {
  let component: FormValidationPage;
  let fixture: ComponentFixture<FormValidationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormValidationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormValidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
