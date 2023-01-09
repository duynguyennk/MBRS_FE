import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBicycleBookingComponent } from './order-bicycle-booking.component';

describe('OrderBicycleBookingComponent', () => {
  let component: OrderBicycleBookingComponent;
  let fixture: ComponentFixture<OrderBicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBicycleBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
