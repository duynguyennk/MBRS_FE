import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodTypeComponent } from './add-food-type.component';

describe('AddFoodTypeComponent', () => {
  let component: AddFoodTypeComponent;
  let fixture: ComponentFixture<AddFoodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
