import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOdFoodBookingComponent } from './list-od-food-booking.component';

describe('ListOdFoodBookingComponent', () => {
  let component: ListOdFoodBookingComponent;
  let fixture: ComponentFixture<ListOdFoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOdFoodBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOdFoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
