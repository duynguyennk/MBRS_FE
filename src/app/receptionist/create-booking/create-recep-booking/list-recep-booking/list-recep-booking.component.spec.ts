import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecepBookingComponent } from './list-recep-booking.component';

describe('ListRecepBookingComponent', () => {
  let component: ListRecepBookingComponent;
  let fixture: ComponentFixture<ListRecepBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecepBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecepBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
