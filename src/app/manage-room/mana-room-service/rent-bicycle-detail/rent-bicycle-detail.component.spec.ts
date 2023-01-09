import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBicycleDetailComponent } from './rent-bicycle-detail.component';

describe('RentBicycleDetailComponent', () => {
  let component: RentBicycleDetailComponent;
  let fixture: ComponentFixture<RentBicycleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentBicycleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBicycleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
