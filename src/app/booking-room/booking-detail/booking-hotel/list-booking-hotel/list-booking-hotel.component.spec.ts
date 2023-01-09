import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingHotelComponent } from './list-booking-hotel.component';

describe('ListBookingHotelComponent', () => {
  let component: ListBookingHotelComponent;
  let fixture: ComponentFixture<ListBookingHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
