import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecepBookingComponent } from './create-recep-booking.component';

describe('CreateRecepBookingComponent', () => {
  let component: CreateRecepBookingComponent;
  let fixture: ComponentFixture<CreateRecepBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecepBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecepBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
