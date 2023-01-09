import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentBicycleTypeComponent } from './list-rent-bicycle-type.component';

describe('ListRentBicycleTypeComponent', () => {
  let component: ListRentBicycleTypeComponent;
  let fixture: ComponentFixture<ListRentBicycleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentBicycleTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentBicycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
