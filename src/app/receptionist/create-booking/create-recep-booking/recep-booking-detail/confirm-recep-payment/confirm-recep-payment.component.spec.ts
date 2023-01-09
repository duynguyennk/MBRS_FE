import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRecepPaymentComponent } from './confirm-recep-payment.component';

describe('ConfirmRecepPaymentComponent', () => {
  let component: ConfirmRecepPaymentComponent;
  let fixture: ComponentFixture<ConfirmRecepPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRecepPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRecepPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
