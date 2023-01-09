import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOdBicycleBookingComponent } from './make-od-bicycle-booking.component';

describe('MakeOdBicycleBookingComponent', () => {
  let component: MakeOdBicycleBookingComponent;
  let fixture: ComponentFixture<MakeOdBicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeOdBicycleBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeOdBicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
