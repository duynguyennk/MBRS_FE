import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOdBicycleBookingComponent } from './list-od-bicycle-booking.component';

describe('ListOdBicycleBookingComponent', () => {
  let component: ListOdBicycleBookingComponent;
  let fixture: ComponentFixture<ListOdBicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOdBicycleBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOdBicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
