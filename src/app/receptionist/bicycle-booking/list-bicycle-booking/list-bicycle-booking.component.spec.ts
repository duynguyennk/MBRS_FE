import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBicycleBookingComponent } from './list-bicycle-booking.component';

describe('ListBicycleBookingComponent', () => {
  let component: ListBicycleBookingComponent;
  let fixture: ComponentFixture<ListBicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBicycleBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
