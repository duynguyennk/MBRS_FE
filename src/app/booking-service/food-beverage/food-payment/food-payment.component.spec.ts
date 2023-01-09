import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPaymentComponent } from './food-payment.component';

describe('FoodPaymentComponent', () => {
  let component: FoodPaymentComponent;
  let fixture: ComponentFixture<FoodPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
