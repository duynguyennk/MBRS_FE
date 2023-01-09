import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentBicycleComponent } from './list-rent-bicycle.component';

describe('ListRentBicycleComponent', () => {
  let component: ListRentBicycleComponent;
  let fixture: ComponentFixture<ListRentBicycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentBicycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentBicycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
