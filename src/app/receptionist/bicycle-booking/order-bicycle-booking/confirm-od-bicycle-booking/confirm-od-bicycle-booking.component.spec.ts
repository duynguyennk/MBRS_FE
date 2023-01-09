import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOdBicycleBookingComponent } from './confirm-od-bicycle-booking.component';

describe('ConfirmOdBicycleBookingComponent', () => {
  let component: ConfirmOdBicycleBookingComponent;
  let fixture: ComponentFixture<ConfirmOdBicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOdBicycleBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOdBicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
