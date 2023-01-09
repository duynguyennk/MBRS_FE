import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOdFoodBookingComponent } from './make-od-food-booking.component';

describe('MakeOdFoodBookingComponent', () => {
  let component: MakeOdFoodBookingComponent;
  let fixture: ComponentFixture<MakeOdFoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeOdFoodBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeOdFoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
