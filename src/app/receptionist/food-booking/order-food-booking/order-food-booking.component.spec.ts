import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFoodBookingComponent } from './order-food-booking.component';

describe('OrderFoodBookingComponent', () => {
  let component: OrderFoodBookingComponent;
  let fixture: ComponentFixture<OrderFoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFoodBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
