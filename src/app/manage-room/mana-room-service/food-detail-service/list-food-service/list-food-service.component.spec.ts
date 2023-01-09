import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodServiceComponent } from './list-food-service.component';

describe('ListFoodServiceComponent', () => {
  let component: ListFoodServiceComponent;
  let fixture: ComponentFixture<ListFoodServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
