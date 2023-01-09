import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodTypeComponent } from './list-food-type.component';

describe('ListFoodTypeComponent', () => {
  let component: ListFoodTypeComponent;
  let fixture: ComponentFixture<ListFoodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
