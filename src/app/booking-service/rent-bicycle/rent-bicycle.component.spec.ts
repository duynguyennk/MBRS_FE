import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBicycleComponent } from './rent-bicycle.component';

describe('RentBicycleComponent', () => {
  let component: RentBicycleComponent;
  let fixture: ComponentFixture<RentBicycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentBicycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBicycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
