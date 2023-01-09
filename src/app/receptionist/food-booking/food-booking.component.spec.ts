import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodBookingComponent } from './food-booking.component';

describe('FoodBookingComponent', () => {
  let component: FoodBookingComponent;
  let fixture: ComponentFixture<FoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
