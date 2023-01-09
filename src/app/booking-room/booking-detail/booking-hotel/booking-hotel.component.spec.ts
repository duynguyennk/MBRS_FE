import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHotelComponent } from './booking-hotel.component';

describe('BookingHotelComponent', () => {
  let component: BookingHotelComponent;
  let fixture: ComponentFixture<BookingHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
