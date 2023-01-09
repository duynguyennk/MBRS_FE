import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingDetailComponent } from './list-booking-detail.component';

describe('ListBookingDetailComponent', () => {
  let component: ListBookingDetailComponent;
  let fixture: ComponentFixture<ListBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
