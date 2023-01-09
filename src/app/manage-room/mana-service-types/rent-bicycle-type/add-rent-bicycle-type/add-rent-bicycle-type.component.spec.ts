import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentBicycleTypeComponent } from './add-rent-bicycle-type.component';

describe('AddRentBicycleTypeComponent', () => {
  let component: AddRentBicycleTypeComponent;
  let fixture: ComponentFixture<AddRentBicycleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRentBicycleTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentBicycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
