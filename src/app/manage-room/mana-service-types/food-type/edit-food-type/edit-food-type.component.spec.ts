import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodTypeComponent } from './edit-food-type.component';

describe('EditFoodTypeComponent', () => {
  let component: EditFoodTypeComponent;
  let fixture: ComponentFixture<EditFoodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
