import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayViewProfileComponent } from './display-view-profile.component';

describe('DisplayViewProfileComponent', () => {
  let component: DisplayViewProfileComponent;
  let fixture: ComponentFixture<DisplayViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayViewProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
