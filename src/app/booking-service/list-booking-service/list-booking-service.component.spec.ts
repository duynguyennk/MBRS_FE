import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingServiceComponent } from './list-booking-service.component';

describe('ListBookingServiceComponent', () => {
  let component: ListBookingServiceComponent;
  let fixture: ComponentFixture<ListBookingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
