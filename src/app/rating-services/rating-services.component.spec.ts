import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingServicesComponent } from './rating-services.component';

describe('RatingServicesComponent', () => {
  let component: RatingServicesComponent;
  let fixture: ComponentFixture<RatingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
