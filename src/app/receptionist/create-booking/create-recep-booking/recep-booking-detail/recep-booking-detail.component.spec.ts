import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepBookingDetailComponent } from './recep-booking-detail.component';

describe('RecepBookingDetailComponent', () => {
  let component: RecepBookingDetailComponent;
  let fixture: ComponentFixture<RecepBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
