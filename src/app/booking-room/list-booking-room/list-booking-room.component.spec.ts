import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingRoomComponent } from './list-booking-room.component';

describe('ListBookingRoomComponent', () => {
  let component: ListBookingRoomComponent;
  let fixture: ComponentFixture<ListBookingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
