import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicyclePaymentComponent } from './bicycle-payment.component';

describe('BicyclePaymentComponent', () => {
  let component: BicyclePaymentComponent;
  let fixture: ComponentFixture<BicyclePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicyclePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BicyclePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
