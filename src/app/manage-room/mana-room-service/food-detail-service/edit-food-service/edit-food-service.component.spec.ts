import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodServiceComponent } from './edit-food-service.component';

describe('EditFoodServiceComponent', () => {
  let component: EditFoodServiceComponent;
  let fixture: ComponentFixture<EditFoodServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
