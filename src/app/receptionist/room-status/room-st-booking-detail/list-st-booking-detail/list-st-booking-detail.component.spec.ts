import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStBookingDetailComponent } from './list-st-booking-detail.component';

describe('ListStBookingDetailComponent', () => {
  let component: ListStBookingDetailComponent;
  let fixture: ComponentFixture<ListStBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
