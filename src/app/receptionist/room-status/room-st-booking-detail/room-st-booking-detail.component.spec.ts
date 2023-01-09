import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStBookingDetailComponent } from './room-st-booking-detail.component';

describe('RoomStBookingDetailComponent', () => {
  let component: RoomStBookingDetailComponent;
  let fixture: ComponentFixture<RoomStBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomStBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
