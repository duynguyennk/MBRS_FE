import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingbellComponent } from './ringbell.component';

describe('RingbellComponent', () => {
  let component: RingbellComponent;
  let fixture: ComponentFixture<RingbellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RingbellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RingbellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
