import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStBookingComponent } from './create-st-booking.component';

describe('CreateStBookingComponent', () => {
  let component: CreateStBookingComponent;
  let fixture: ComponentFixture<CreateStBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
