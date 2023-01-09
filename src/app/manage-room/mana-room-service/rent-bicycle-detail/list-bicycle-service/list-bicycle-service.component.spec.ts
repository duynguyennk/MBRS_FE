import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBicycleServiceComponent } from './list-bicycle-service.component';

describe('ListBicycleServiceComponent', () => {
  let component: ListBicycleServiceComponent;
  let fixture: ComponentFixture<ListBicycleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBicycleServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBicycleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
