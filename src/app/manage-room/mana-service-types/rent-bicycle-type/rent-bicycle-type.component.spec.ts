import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBicycleTypeComponent } from './rent-bicycle-type.component';

describe('RentBicycleTypeComponent', () => {
  let component: RentBicycleTypeComponent;
  let fixture: ComponentFixture<RentBicycleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentBicycleTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBicycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
