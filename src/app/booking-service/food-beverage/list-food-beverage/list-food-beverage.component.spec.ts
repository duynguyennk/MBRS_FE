import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodBeverageComponent } from './list-food-beverage.component';

describe('ListFoodBeverageComponent', () => {
  let component: ListFoodBeverageComponent;
  let fixture: ComponentFixture<ListFoodBeverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodBeverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodBeverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
