import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailServiceComponent } from './food-detail-service.component';

describe('FoodDetailServiceComponent', () => {
  let component: FoodDetailServiceComponent;
  let fixture: ComponentFixture<FoodDetailServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDetailServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetailServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
