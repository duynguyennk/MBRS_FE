import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleBookingComponent } from './bicycle-booking.component';

describe('BicycleBookingComponent', () => {
  let component: BicycleBookingComponent;
  let fixture: ComponentFixture<BicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicycleBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
