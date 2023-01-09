import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInforBookingComponent } from './edit-infor-booking.component';

describe('EditInforBookingComponent', () => {
  let component: EditInforBookingComponent;
  let fixture: ComponentFixture<EditInforBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInforBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInforBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
