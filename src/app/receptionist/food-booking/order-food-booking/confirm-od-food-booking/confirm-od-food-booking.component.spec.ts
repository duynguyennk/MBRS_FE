import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOdFoodBookingComponent } from './confirm-od-food-booking.component';

describe('ConfirmOdFoodBookingComponent', () => {
  let component: ConfirmOdFoodBookingComponent;
  let fixture: ComponentFixture<ConfirmOdFoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOdFoodBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOdFoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
