import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodServiceComponent } from './add-food-service.component';

describe('AddFoodServiceComponent', () => {
  let component: AddFoodServiceComponent;
  let fixture: ComponentFixture<AddFoodServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
