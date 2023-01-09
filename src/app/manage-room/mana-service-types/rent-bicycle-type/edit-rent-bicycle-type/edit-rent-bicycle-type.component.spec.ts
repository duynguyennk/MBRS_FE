import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentBicycleTypeComponent } from './edit-rent-bicycle-type.component';

describe('EditRentBicycleTypeComponent', () => {
  let component: EditRentBicycleTypeComponent;
  let fixture: ComponentFixture<EditRentBicycleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRentBicycleTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRentBicycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
