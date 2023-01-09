import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodBookingComponent } from './list-food-booking.component';

describe('ListFoodBookingComponent', () => {
  let component: ListFoodBookingComponent;
  let fixture: ComponentFixture<ListFoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
